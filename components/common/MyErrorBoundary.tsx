import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    font-size: 1.2rem;
    text-align: center;

    h1 {
        font-size: 2em;
    }
    p {
        margin-top: 16px;
        font-size: 0.8em;
    }

    button {
        margin-top: 16px;
        
    }
`


interface IProps {
    children: ReactNode;
}

interface IFallbackProps {
    error: any;
    resetErrorBoundary: any
}


const ErrorFallback: React.FC<IFallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <Container>
            <h1>에러 발생</h1>
            <p>{error.message}</p>
            <button onClick={resetErrorBoundary}>다시 불러오기</button>
        </Container>
    )
}

const MyErrorBoundary: React.FC<IProps> = ({ children }) => {
    const { reset } = useQueryErrorResetBoundary();
    
    const handleOnError = (error: Error) => {
        // 에러 리포팅 서비스에 에러를 기록 (render 메서드가 실행된 후 발동)
        console.log('Uncaught error:', error);
    }

    return (
        <ErrorBoundary
            onReset={reset}
            FallbackComponent={ErrorFallback}
            onError={handleOnError}
        >
            {children}
        </ErrorBoundary>

    )
}

export default MyErrorBoundary;
