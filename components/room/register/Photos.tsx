import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';
import uuid from 'react-uuid';

import storage from '../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { useRegisterRoomStore } from '../../../stores/useRegisterRoomStore';

import PhotoCardList from './PhotoCardList';
import Button from '../../common/Button';
import StageInfo from './StageInfo';
import Footer from './Footer';


const Container = styled.div`
    display: flex;
    width: 100vw;
    height: calc(100vh - 80px);
    .selector-wrapper {
        position: relative;
        flex: 1;
        height: 100%;
        min-width: 600px;
        .upload-photo-wrapper {
            width: 500px;
            height: 600px;
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px dashed ${palette.gray_bb};
            border-radius: 6px;
            h1 {
                top: 40%;
                position: absolute;
                font-weight: bold;
                font-size: 1.5rem;
            }
            input {
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
            }

            button {
                margin-top: 20px;
                width: 120px;
            }

            img { 
                width: 100%;
                max-width: 100%;
            }
        }
    }
`;



const Photos: React.FC = () => {
    const router = useRouter();
    const { photos: storedPhotos, setPhotos } = useRegisterRoomStore(
        (state) => ({ photos: state.photos, setPhotos: state.setPhotos })
        , shallow
    );

    const [images, setImages] = useState<string[]>([]);

    useLayoutEffect(() => {
        {!!storedPhotos && setImages([...storedPhotos])}
    }, [storedPhotos])

    
    /** 이미지 업로드 하기(firebase Store 사용) */
    const addPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files?.[0];
        if (file) {
            try {
                const storageRef = ref(storage, `/photos/${uuid()}_${file.name}`)
                uploadBytes(storageRef, file).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        setPhotos([...images, url])
                    });
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    /** 사진 삭제 */
    const deletePhoto = (src: string) => {
        const fileRef = ref(storage, src);
        deleteObject(fileRef).then(() => {
            setPhotos(images?.filter((image => image !== src)))
        })
    };

    const onClickNextButton = () => {
        if (images?.length === 4) {
            router.push('/room/register/title')
        }
    }

    return (
        <Container>
            <StageInfo>
                <h1>
                    이제 숙소 사진을 올릴 차례입니다.
                </h1>
            </StageInfo>
            <div className='selector-wrapper'>
                {images?.length === 0 ? 
                (
                    <div className="upload-photo-wrapper">
                        <>
                            <h1>여기로 사진을 끌어다 놓으세요.</h1>
                            <input type="file" accept='image/*' onChange={addPhoto} />
                            <Button >사진 업로드</Button>
                        </>
                    </div>
                ) : (
                    <>  
                        <PhotoCardList photos={images} uploadImage={addPhoto} deletePhoto={deletePhoto} />
                    </>
                )}
                <Footer step={7} prevHref='/room/register/amenities' isValid={images?.length === 4} >
                    <button className={'next-button'} onClick={onClickNextButton}>다음</button>
                </Footer>
            </div>
        </Container>
    )
}

export default Photos;