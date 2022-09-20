import React from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import Image from 'next/image';

import PencilIcon from '../../../public/static/svg/register/photo/pencil.svg';
import TrashCanIcon from '../../../public/static/svg/register/photo/trash_can.svg';

const Container = styled.ul`
    width: 700px;
    /* height: 500px; */
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
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
        &:hover {
            .interaction-buttons {
                display: flex;
            }
        }

        input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
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
            &:first-child {
                margin-right: 16px;
            }
        }
    }
`;


interface IProps {
    photos: string[];
}
const PhotoCardList: React.FC<IProps> = ({ photos }) => {
  return (
    <Container>
        {photos.map((photo, index) => (
            <div key={index}>
                {index === 0 && (
                    <li className="first-photo-wrapper">
                        <Image src={photo} alt='' layout='fill'/>
                        <div className="interaction-buttons">
                            <button type='button' onClick={() => {}}>
                                <TrashCanIcon />
                            </button>
                            <button type='button' onClick={() => {}}>
                                <PencilIcon />
                            </button>
                        </div>
                    </li>
                )}
            </div>
        ))}
    </Container>
  )
}

export default React.memo(PhotoCardList);