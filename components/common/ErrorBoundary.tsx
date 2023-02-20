import React, { Component, ErrorInfo, ReactNode } from 'react';

interface IProps {
    children?: ReactNode
}

interface IState {
    hasError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
    public state: IState = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): IState {
        // (1) throw 된 에러를 catch 한다. (2) return 한 값을 기반으로 setState 를 실행한다.
        // 다음 렌더링에 폴백 UI가 보이도록 상태를 업데이트
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // 에러 리포팅 서비스에 에러를 기록 (render 메서드가 실행된 후 발동)
        console.log('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            // 폴백 UI를 커스텀하여 렌더링할 수 있다.
            return (
                <h1 className='error-boundary'>에러가 발생.....</h1>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;