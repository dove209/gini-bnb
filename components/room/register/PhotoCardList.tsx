import React from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import Image from 'next/image';

import TrashCanIcon from '../../../public/static/svg/register/photo/trash_can.svg';
import GrayPlusIcon from '../../../public/static/svg/register/photo/gray_plus.svg';

const Container = styled.div`
    width: 700px;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    h1 {
        font-weight: bold;
        font-size: 1.5rem;
    }
    ul {
        margin-top: 20px;
        /* 첫 번째 사진 */
        .first-photo-wrapper {
            width: 100%;
            height: 460px;
            margin: 0 auto 24px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 3px;
            overflow: hidden;
        }
        li {
            &:hover {
                .interaction-buttons {
                    display: flex;
                }
            }
        }

        li:nth-child(3n + 1) {
            margin-right: 0;
        }

        .photo-card {
            position: relative;
            float: left;
            width: calc((100% - 48px) / 3);
            height: 180px;
            border-radius: 3px;
            overflow: hidden;
            margin-right: 24px;
        }

        /** 수정, 삭제 버튼 */
        .interaction-buttons {
            display: none;
            position: absolute;
            top: 16px;
            right: 16px;
            button {
                width: 42px;
                height: 42px;
                background-color: white;
                border-radius: 50%;
                cursor: pointer;
                border: 0;
                outline: none;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
            }
        }

        /** 사진 추가하기 카드 */
        .add-more-photo-card {
            position: relative;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            color: ${palette.gray_bb};
            border: 2px dashed ${palette.gray_bb};
            border-radius: 3px;
            cursor: pointer;
            overflow: hidden;
            margin-right: 24px;
            margin-bottom: 24px;
            display: flex;
            input {
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
            }
            svg {
                margin-bottom: 12px;
            }
        }
    }
`;


interface IProps {
    photos: string[];
    uploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    deletePhoto: (src: string) => void;
}
const PhotoCardList: React.FC<IProps> = ({ photos, uploadImage, deletePhoto }) => {
    return (
        <Container>
            <h1>4장의 사진을 올려주세요.</h1>
            <ul>
                {photos.map((photo, index) => (
                    <React.Fragment key={index}>
                        {index === 0 && (
                            <li className="first-photo-wrapper">
                                <Image src={photo} alt='' layout='fill' />
                                <div className="interaction-buttons">
                                    <button type='button' onClick={() => deletePhoto(photo)}>
                                        <TrashCanIcon />
                                    </button>
                                </div>
                            </li>
                        )}
                        {index !== 0 && index <= 3 && (
                            <li className="photo-card">
                                <Image src={photo} alt='' layout='fill' />
                                <div className="interaction-buttons">
                                    <button type='button' onClick={() => deletePhoto(photo)}>
                                        <TrashCanIcon />
                                    </button>
                                </div>
                            </li>
                        )}
                    </React.Fragment>
                ))}
                {photos.length < 4 && (
                    <li className='photo-card'>
                        <div className="add-more-photo-card">
                            <input type="file" accept='image/*' onChange={uploadImage} />
                            <GrayPlusIcon />
                            추가하기
                        </div>
                    </li>
                )}
            </ul>
        </Container>
    )
}

export default React.memo(PhotoCardList);