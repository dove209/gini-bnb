import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

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
        .text-input-wrapper {
            width: 50%;
            min-width: 400px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            h1 {
                font-weight: bold;
                font-size: 1.5rem;
            }
            p {
                margin-top: 10px;
                font-size: 1rem;
                color: ${palette.gray_aa};
            }
            textarea {
                width: 100%;
                height: 200px;
                padding: 20px;
                margin-top: 20px;
                border: 2px solid ${palette.gray_bb};
                border-radius: 6px;
                outline: none;
                font-size: 1.5rem;
                font-family: Noto Sans, Noto Sans KR;
                -ms-overflow-style: none; 
                scrollbar-width: none;
                &::-webkit-scrollbar {
                    width: 0;
                }
            }
            span {
                font-weight: bold;
                display:inline-block;
                margin-top: 10px;
            }
        }
    }
`;



const Description: React.FC = () => {
    const router = useRouter();
    const { description: storedDescription, setRegisterRoom } = useRegisterRoomStore(
        (state) => ({ description: state.description, setRegisterRoom: state.setRegisterRoom })
        , shallow
    );

    const [description, setDescription] = useState('');

    useEffect(() => {
        {!!storedDescription && setDescription(storedDescription)}
    }, [storedDescription])

    
    const onClickNextButton = () => {
        if (!!description) {
            setRegisterRoom({
                description
            })
            router.push('/room/register/price')
        }
    }

    return (
        <Container>
            <StageInfo>
                <h1>
                    숙소에 대해 설명해 주세요.
                </h1>
            </StageInfo>
            <div className='selector-wrapper'>
                <div className="text-input-wrapper">
                    <h1>숙소 설명 작성하기</h1>
                    <p>
                        숙소의 장점, 특별한 편의 시설과 주변 지역의 매력을 소개해주세요.
                    </p>
                    <textarea 
                        placeholder='편안함을 자랑하는 이곳에서 즐거운 시간을 보내실 수 있을 것입니다.'
                        maxLength={500}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                    <span>
                       {description.length} / 500
                    </span>
                </div>
                <Footer step={9} prevHref='/room/register/title' isValid={!!description} >
                    <button className={'next-button'} onClick={onClickNextButton}>다음</button>
                </Footer>
            </div>
        </Container>
    )
}

export default Description;