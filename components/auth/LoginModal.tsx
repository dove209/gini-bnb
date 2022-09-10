import React, { useState } from "react";
import { AxiosError } from "axios";
import styled from "styled-components";
import palette from "../../styles/palette";
import { useFormik } from "formik";
import * as Yup from "yup";

import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import MaillIcon from "../../public/static/svg/auth/mail.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";

import Button from "../common/Button";

import { useAuthModalStore } from "../../stores/useAuthModalStore";

const Container = styled.div`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;
  .header {
    height: 32px;
    position: relative;
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 18px;
      font-weight: bold;
    }
    .modal-close-x-icon {
      cursor: pointer;
    }
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .login-submit-button-wrapper {
    margin-top: 24px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .errorText {
    margin-top: 5px;
    color: red;
    font-size: 12px;
  }

  .login-set-login {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;
const InputWrapper = styled.div<{ isIcon?: boolean }>`
  position: relative;
  margin-top: 16px;
  input {
    width: 100%;
    height: 46px;
    padding: ${({ isIcon }) => (isIcon ? "0 44px 0 11px" : "0 11px")};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    ::placeholder {
      color: ${palette.gray_76};
    }
    &:focus {
      border-color: ${palette.dark_cyan} !important;
    }
  }
  svg {
    position: absolute;
    top: 50%;
    right: 11px;
    transform: translateY(-50%);
    cursor: pointer;
    width: 22px;
  }
`;

interface IProps {
  closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
    const { setAuthModalType } = useAuthModalStore();

  const [hidePassword, setHidePassword] = useState(true);

  // 비밀번호 숨김 토글하기
  const toggleHidePassword = () => {
    setHidePassword((prevState) => !prevState);
  };

  const logInValidationSchema = Yup.object({
    email: Yup.string().required("* 필수 입력해 주세요."),
    password: Yup.string().required("* 필수 입력해 주세요."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: logInValidationSchema,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        const signUpBody = {
          email,
          password,
        };
        //   const { data } = await signupAPI(signUpBody)
        //   if (data) {
        //     alert('회원 가입이 완료 되었습니다.');

        //     closeModal();
        //   }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
        }
      }
    },
  });

  return (
    <Container>
      <div className="header">
        <h1>로그인</h1>
        <CloseXIcon className={"modal-close-x-icon"} onClick={closeModal} />
      </div>

      <form onSubmit={formik.handleSubmit}>
        <InputWrapper>
          <input
            placeholder="이메일 주소"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <MaillIcon />
        </InputWrapper>
        {formik.touched.email && formik.errors.email && (
          <div className="errorText">{formik.errors.email}</div>
        )}

        <InputWrapper isIcon={true}>
          <input
            placeholder="비밀번호 설정"
            name="password"
            type={hidePassword ? "password" : "text"}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {hidePassword ? (
            <OpenedEyeIcon onClick={toggleHidePassword} />
          ) : (
            <ClosedEyeIcon onClick={toggleHidePassword} />
          )}
        </InputWrapper>
        {formik.touched.password && formik.errors.password && (
          <div className="errorText">{formik.errors.password}</div>
        )}

        <div className="login-submit-button-wrapper">
          <Button type="submit">로그인</Button>
        </div>
      </form>

      <p>
        계정이 없으신가요?
        <span className="login-set-login" onClick={() => setAuthModalType('signup')}>
          회원가입
        </span>
      </p>
    </Container>
  );
};

export default LoginModal;
