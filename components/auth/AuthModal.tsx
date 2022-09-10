import React from 'react'
import { useAuthModalStore } from '../../stores/useAuthModalStore'
import SignUpModal from './SignUpModal'
import LoginModal from './LoginModal'

interface IProps {
    closeModal: () => void;
}

const AuthModal:React.FC<IProps> = ({ closeModal }) => {
  const { authModalType } = useAuthModalStore(); // authModalType에 따라 재렌더링이 이뤄지는 로직이 맞음
  return (
    <>
        {authModalType === 'signup' && <SignUpModal closeModal={closeModal} />}
        {authModalType === 'login' && <LoginModal closeModal={closeModal} />}
    </>
  )
}

export default AuthModal;