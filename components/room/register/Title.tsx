import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { fadeUp } from './FadeUpAnimation';

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
            left: 50%;
            transform: translate(-50%, -50%);
            animation: ${fadeUp('55%', '50%')} 0.8s ease-in-out forwards;
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
                font-size: 2rem;
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



const Title: React.FC = () => {
    const router = useRouter();
    const { title: storedTitle, setTitle } = useRegisterRoomStore(
        (state) => ({ title: state.title, setTitle: state.setTitle })
        , shallow
    );

    const [value, setValue] = useState<string>('');

    useLayoutEffect(() => {
        {!!storedTitle && setValue(storedTitle)}
    }, [storedTitle])

    

    const onClickNextButton = () => {
        if (!!value) {
            setTitle(value)
            router.push('/room/register/description');
        }
    }

    return (
        <Container>
            <StageInfo>
                <h1>
                    ?????? ????????? ??????????????????.
                </h1>
            </StageInfo>
            <div className='selector-wrapper'>
                <div className="text-input-wrapper">
                    <h1>?????? ?????? ?????????</h1>
                    <p>
                        ?????? ???????????? ????????? ???????????? ??? ?????? ????????? ???????????? ?????????.
                    </p>
                    <textarea 
                        placeholder='????????? ?????????????????? ???????????? ?????????'
                        maxLength={50}
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                    <span>
                       {value.length} / 50
                    </span>
                </div>
                <Footer step={8} prevHref='/room/register/photos' isValid={!!value} >
                    <button className={'next-button'} onClick={onClickNextButton}>??????</button>
                </Footer>
            </div>
        </Container>
    )
}

export default Title;