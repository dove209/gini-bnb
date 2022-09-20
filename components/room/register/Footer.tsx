import React, { useLayoutEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';
import { useRegisterStepStore } from '../../../stores/useRegisterStepStore';

const fillStepGauge = (prevStep: number, curStep: number) => keyframes`
    from {
        width: ${prevStep / 10 * 100}%;
    } 
    to {
        width: ${curStep / 10 * 100}%;
    }
`

const Container = styled.div<{ prevStep:number, curStep:number, isValid: boolean}>`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    padding: 16px 0px;
    z-index: 10;
    .step-bar {
        position: absolute;
        top: 0px;
        height: 2px;
        width: 100%;
        background-color: ${palette.gray_e5};
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 2px;
            animation: ${({ prevStep, curStep }) => fillStepGauge(prevStep, curStep)} 0.5s ease-out forwards;
            background-color: ${palette.black};
        }
    }
    .button-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        width: 95%;
        height: 100%;

        button {
            border: 0;
            border-radius: 4px;
            outline: none;
            font-size: 16px;
            font-weight: 800;
            font-family: Noto Sans, Noto Sans KR;
            width: 80px;
            height: 100%;
        }

        .back-button {
            cursor: pointer;
            background-color: transparent;
            &:hover {
                background-color: ${palette.gray_ed}
            }
        }
        .next-button {          
            background-color: ${({ isValid }) => (isValid ? `${palette.black}` : `${palette.gray_bb}`)};
            cursor: ${({ isValid }) => (isValid ? 'pointer' : 'not-allowed')};
            color: #fff;
        }
    }
`;

interface IProps {
    step: number;
    prevHref?: string;
    isValid?: boolean;
    children: React.ReactNode;
}


const Footer: React.FC<IProps> = ({ step = 1, prevHref = '', isValid = false, children }) => {
    const router = useRouter();
    const { prevStep, curStep, setPrevStep, setCurStep } = useRegisterStepStore();

    useLayoutEffect(() => {
            setCurStep(step)
        return () => {
            setPrevStep(curStep)
        }
    },[])

    return (
        <Container prevStep={prevStep} curStep={curStep} isValid={isValid} >
            <div className="step-bar" ></div>
            <div className="button-wrapper">
                <button className='back-button' onClick={() => router.replace(prevHref)}>
                    뒤로
                </button>
                {children}
            </div>
    
        </Container>
    )
}

export default Footer