import React, { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import SignUpModal from "../components/auth/SignUpModal";
import LoginModal from "../components/auth/LoginModal";

import { useAuthModalStore } from "../stores/useAuthModalStore";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
  }
`;

const useModal = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };


  const ModalPortal: React.FC = () => {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);
    const { authModalType } = useAuthModalStore();

    useEffect(() => {
      setMounted(true);
      if (document) {
        const dom = document.querySelector("#root-modal");
        ref.current = dom;
      }
    }, []);

    if (ref.current && mounted && modalOpened) {
      return createPortal(
        <Container>
          <div
            className="modal-background"
            role={"presentation"}
            onClick={closeModal}
          />
        {authModalType === 'signup' && <SignUpModal closeModal={closeModal} />}
        {authModalType === 'login' && <LoginModal closeModal={closeModal} />}
        </Container>,
        ref.current
      );
    }
    return null;
  };

  return {
    openModal,
    closeModal,
    ModalPortal: React.memo(ModalPortal),
  };
};

export default useModal;
