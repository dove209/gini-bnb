import React from 'react'
import { useAuthModalStore } from '../../stores/useAuthModalStore'
import SignUpModal from './SignUpModal'
import LoginModal from './LoginModal'

interface IProps {
    closeModal: () => void;
}

const AuthModal:React.FC<IProps> = ({ closeModal }) => {
  const authModalType = useAuthModalStore(state => state.authModalType);
  return (
    <>
        {authModalType === 'signup' && <SignUpModal closeModal={closeModal} />}
        {authModalType === 'login' && <LoginModal closeModal={closeModal} />}
    </>
  )
}

export default AuthModal;