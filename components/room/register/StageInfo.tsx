import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    flex: 1;
    height: 100%;
    background: url('/static/image/registerRoomBackground.jpg') no-repeat center;
    background-size: cover;
    h1 {
        color: white;
        font-weight: bold;
        font-size: 3rem;
        position: absolute;
        top: 50%;
        left: 5%;
        transform: translateY(-50%);
        line-height: 3.5rem;
    }
`;

interface IProps {
    children: React.ReactNode;
}


const StageInfo: React.FC<IProps> = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default StageInfo;