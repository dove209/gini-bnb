import React, {  useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';
import Image from 'next/image';
import shallow from 'zustand/shallow';

import { privacyTypeList } from '../../../lib/staticData';
import { useRegisterRoomStore } from '../../../stores/useRegisterRoomStore';

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
        ul {
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50%;
            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 34px 20px;
                border: 2px solid ${palette.gray_ed};
                border-radius: 12px;
                font-weight: bold;
                font-size: 18px;
                cursor: pointer;
                &:hover {
                    border-color: ${palette.black};
                }
                &.selected {
                    border-color: ${palette.black};
                    background-color: ${palette.gray_f7}
                }
            }
            li + li {
                margin-top: 10px;
            }
        }
    }
`;



const PrivacyType: React.FC = () => {
    const router = useRouter();
    const { roomType: storedRoomType, setRegisterRoom } = useRegisterRoomStore(
        (state) => ({ roomType: state.roomType, setRegisterRoom: state.setRegisterRoom })
        ,shallow
    );
    
    const [roomType, setRoomType] = useState<string | null>(); // 숙소의 종류 선택


    useEffect(() => {
        setRoomType(storedRoomType)
    },[storedRoomType])

    const onClickNextButton = () => {
        if(!!roomType) {
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
                    게스트가 머무르게 될 숙소의 종류가<br />
                    무엇인가요?
                </h1>
            </StageInfo>
            <div className='selector-wrapper'>
                <ul>
                    {privacyTypeList.map((option, index) => (
                        <li className={option.type === roomType ? 'selected' : ''} key={index} onClick={() => setRoomType(option.type)}>
                            <span>{option.type}</span>
                        </li>
                    ))}
                </ul>
                <Footer step={3} prevHref='/room/register/building' isValid={!!roomType} >
                    <button className={'next-button'} onClick={onClickNextButton}>다음</button>
                </Footer>
            </div>
        </Container>
    )
}

export default PrivacyType;