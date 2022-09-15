import React from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';

const Container = styled.div<{isValid: boolean}>`
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
    prevHref?: string;
    isValid?: boolean;
    children: React.ReactNode;
}


const Footer: React.FC<IProps> = ({ prevHref = '', isValid=false, children }) => {
    const router = useRouter();
    return (
        <Container isValid={isValid}>
            <div className="step-bar"></div>
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