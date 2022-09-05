import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div<{ isIcon: boolean }>`
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

    .input-icon-wrapper {
        position: absolute;
        top: 0;
        right: 11px;
        height: 46px;
        display: flex;
        align-items: center;
    }
`;

// extends를 사용하여 IProps는 <input> 태그가 가지는 속성을 확장하여 사용하게됨
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: JSX.Element; // icon 값을 사용하지 않아도 된다.
    //icon : JSX.Element | undefined;  // icon을 받는 undefined일 수 있다.
}

const Input: React.FC<IProps> = ({ icon, ...props }) => {
  return (
    <Container isIcon={!!icon}>
        <input {...props} />
        <div className="input-icon-wrapper">{icon}</div>
    </Container>
  )
}

export default Input