import React, { Component, ErrorInfo, ReactNode  } from 'react';

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
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return <h1 className='error-boundary'>에러가 발생.....</h1>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;