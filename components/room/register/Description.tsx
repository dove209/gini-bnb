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
    const { description: storedDescription, setDescription } = useRegisterRoomStore(
        (state) => ({ description: state.description, setDescription: state.setDescription })
        , shallow
    );

    const [value, setValue] = useState<string>('');

    useLayoutEffect(() => {
        {!!storedDescription && setValue(storedDescription)}
    }, [storedDescription])

    
    const onClickNextButton = () => {
        if (!!value) {
            setDescription(value);
            router.push('/room/register/price')
        }
    }

    return (
        <Container>
            <StageInfo>
                <h1>
                    ????????? ?????? ????????? ?????????.
                </h1>
            </StageInfo>
            <div className='selector-wrapper'>
                <div className="text-input-wrapper">
                    <h1>?????? ?????? ????????????</h1>
                    <p>
                        ????????? ??????, ????????? ?????? ????????? ?????? ????????? ????????? ??????????????????.
                    </p>
                    <textarea 
                        placeholder='???????????? ???????????? ???????????? ????????? ????????? ????????? ??? ?????? ????????????.'
                        maxLength={500}
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                    <span>
                       {value.length} / 500
                    </span>
                </div>
                <Footer step={9} prevHref='/room/register/title' isValid={!!value} >
                    <button className={'next-button'} onClick={onClickNextButton}>??????</button>
                </Footer>
            </div>
        </Container>
    )
}

export default Description;