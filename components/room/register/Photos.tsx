import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';
import Image from 'next/image';
import shallow from 'zustand/shallow';

import { privacyTypeList } from '../../../lib/staticData';
import { useRegisterRoomStore } from '../../../stores/useRegisterRoomStore';

import UploadIcon from '../../../public/static/svg/register/upload.svg';
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
        .upload-photo-wrapper {
            width: 500px;
            height: 700px;
            position: absolute;
            top: 50%;
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
                width: 167px;
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
    const [photos, setPhotos] = useState<string[]>([]);

    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        console.log(files)

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
                {photos.length === 0 && (
                    <div className="upload-photo-wrapper">
                        <>
                            <h1>여기로 사진을 끌어다 놓으세요.</h1>
                            <input type="file" accept='image/*' onChange={uploadImage} />
                            <Button >사진 업로드</Button>
                        </>
                    </div>
                )}
                <Footer step={7} prevHref='/room/register/amenities' isValid={!!roomType} >
                    <button className={'next-button'} onClick={onClickNextButton}>다음</button>
                </Footer>
            </div>
        </Container>
    )
}

export default Photos;