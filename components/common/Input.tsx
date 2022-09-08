import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

interface InputContainerProps {
    isIcon: boolean;
    isValid: boolean;
    useValidation?: boolean;
}
const Container = styled.div<InputContainerProps>`
    input {
        position: relative;
        width: 100%;
        height: 46px;
        padding: ${({ isIcon }) => isIcon ? '0 44px 0 11px' : '0 11px'};
        border: 1px solid ${palette.gray_eb};
        border-radius: 4px;
        font-size: 16px;
        outline: none;
        ::placeholder {
            color: ${palette.gray_76};
        }
        &:focus {
            border-color: ${palette.dark_cyan} !important
        }
    }

    svg { 
        position: absolute;
        right: 11px;
        height: 46px;
    }

    .input-error-message {
        margin-top: 8px;
        font-weight: 600;
        font-size: 14px;
        color: ${palette.tawny};
    }

    ${({ useValidation, isValid }) =>
        useValidation && !isValid && css`
            input {
                background-color: ${palette.snow};
                border-color: ${palette.orange};
                &:focus {
                    border-color: ${palette.orange}
                }
            }
        `
    }

    ${({ useValidation, isValid }) =>
        useValidation && isValid && css`
            input {
                border-color: ${palette.dark_cyan};
            }
        `
    }

`;

// extends를 사용하여 IProps는 <input> 태그가 가지는 속성을 확장하여 사용하게됨
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: JSX.Element; // icon 값을 사용하지 않아도 된다.
    //icon : JSX.Element | undefined;  // icon을 받는 undefined일 수 있다.
    isValid?: boolean;
    validateMode?: boolean;
    useValidation?: boolean;
    errorMessage?: string;
}

const Input: React.FC<IProps> = ({ icon, validateMode, isValid = false, useValidation = true, errorMessage, ...props }) => {
    return (
        <Container isIcon={!!icon} isValid={isValid} useValidation={validateMode && useValidation}>
            <input {...props} />
            {icon}
            {useValidation && validateMode && !isValid && errorMessage && (
             <p className="input-error-message">{errorMessage}</p>   
            )}
        </Container>
    )
}

export default Input