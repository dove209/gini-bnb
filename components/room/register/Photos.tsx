import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';
import uuid from 'react-uuid';

import storage from '../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
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
    const { roomType: storedRoomType, setRegisterRoom } = useRegisterRoomStore(
        (state) => ({ roomType: state.roomType, setRegisterRoom: state.setRegisterRoom })
        , shallow
    );

    const [roomType, setRoomType] = useState<string | null>(); // 숙소의 종류 선택
    const [photos, setPhotos] = useState<string[]>([
        'https://firebasestorage.googleapis.com/v0/b/gini-bnb-imageupload.appspot.com/o/photos%2Ff34aa6-d28c-75d-15c-3416027f4375_KakaoTalk_20220914_131925481.jpg?alt=media&token=fe13125d-c1f5-4b1c-824b-c950c88cb18f',
        'https://firebasestorage.googleapis.com/v0/b/gini-bnb-imageupload.appspot.com/o/photos%2Ff34aa6-d28c-75d-15c-3416027f4375_KakaoTalk_20220914_131925481.jpg?alt=media&token=fe13125d-c1f5-4b1c-824b-c950c88cb18f',
        'https://firebasestorage.googleapis.com/v0/b/gini-bnb-imageupload.appspot.com/o/photos%2Ff34aa6-d28c-75d-15c-3416027f4375_KakaoTalk_20220914_131925481.jpg?alt=media&token=fe13125d-c1f5-4b1c-824b-c950c88cb18f',
    ]);

    /** 이미지 업로드 하기(firebase Store 사용) */
    const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files && files.length > 0) {
            try {
                const file = files[0];
                const storageRef = ref(storage, `/photos/${uuid()}_${file.name}`)
                uploadBytes(storageRef, file).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        console.log(url)
                        setPhotos((prev) => [...prev, url]);
                    });
                });
            } catch (error) {
                console.log(error)
            }
        }
    }


    useEffect(() => {
        setRoomType(storedRoomType)
    }, [storedRoomType])

    const onClickNextButton = () => {
        if (!!roomType) {
            setRegisterRoom({
                roomType
            })
            router.push('/room/register/floor-plan')
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
                {photos.length === 0 ? 
                (
                    <div className="upload-photo-wrapper">
                        <>
                            <h1>여기로 사진을 끌어다 놓으세요.</h1>
                            <input type="file" accept='image/*' onChange={uploadImage} />
                            <Button >사진 업로드</Button>
                        </>
                    </div>
                ) : (
                    <>
                        <PhotoCardList photos={photos} />
                    </>
                )}
                <Footer step={7} prevHref='/room/register/amenities' isValid={!!roomType} >
                    <button className={'next-button'} onClick={onClickNextButton}>다음</button>
                </Footer>
            </div>
        </Container>
    )
}

export default Photos;