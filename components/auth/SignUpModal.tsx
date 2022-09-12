import React, { useState } from 'react'
import { AxiosError } from 'axios';
import styled from 'styled-components'
import palette from '../../styles/palette';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { yearList, monthList, dayList } from '../../lib/staticData';
import CloseXIcon from '../../public/static/svg/modal/modal_close_x_icon.svg';
import MaillIcon from '../../public/static/svg/auth/mail.svg';
import PersonIcon from '../../public/static/svg/auth/Person.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';

import Button from '../common/Button';

import { signupAPI } from '../../lib/api/auth';
import { signIn } from 'next-auth/react';

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
        font-weight:bold;
      }
      .modal-close-x-icon {
        cursor: pointer;
      }
    }

    .input-wrapper {
      position: relative;
      margin-bottom: 16px;
    }

    .sign-up-password-input-wrapper {
      svg {
        cursor: pointer;
      }
    }

    .sign-up-birthday-label {
      font-size: 16px;
      font-weight: bold;
      margin: 16px 0 16px
    }

    .sign-up-birthday-selectors-wrapper {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
      .selector {
        flex: 1;
      }
      .selector + .selector {
        margin-left: 16px;
      }
    }

    .sign-up-submit-button-wrapper {
      margin-top: 24px;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid ${palette.gray_eb}
    }

    .errorText {
      margin-top: 5px;
      color: red;
      font-size: 12px;
    }

    .sign-up-set-login {
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
        top: 50%;
        right: 11px;
        transform: translateY(-50%);
        cursor: pointer;
        width: 22px;
      }
`

const SelectorWrapper = styled.div`
    width: 100%;
    height: 46px;
    display: flex;
    justify-content: space-between;
    select {
      flex: 1;
      background-color: white;
      border: 1px solid ${palette.gray_ed};
      padding: 0 11px;
      border-radius: 4px;
      outline: none;
      -webkit-appearance: none;
      background: url('/static/svg/common/selector/selector_down_arrow.svg') no-repeat right 11px center;
      font-size: 16px;
      &:focus {
          border-color: ${palette.dark_cyan};
      }
    }
    select + select {
      margin-left: 16px;
    }
`


interface IProps {
  closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const setAuthModalType = useAuthModalStore(state => state.setAuthModalType);

  const [hidePassword, setHidePassword] = useState(true);  

  // 비밀번호 숨김 토글하기
  const toggleHidePassword = () => {
    setHidePassword((prevState) => !prevState)
  }

  const signUpValidationSchema = Yup.object({
    email: Yup.string().email('* 이메일 형식이 아닙니다.').required('* 필수 입력해 주세요.'),
    name: Yup.string().required('* 필수 입력해 주세요.'),
    password: Yup.string().required('* 필수 입력해 주세요.').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'* 문자,숫자,특수문자 포함 8자 이상 입력해주세요.'),
    birthYear: Yup.string().required('* 필수 입력해 주세요.'),
    birthMonth: Yup.string().required('* 필수 입력해 주세요.'),
    birthDay: Yup.string().required('* 필수 입력해 주세요.'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      birthYear: '',
      birthMonth: '',
      birthDay: '',
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      try {
        const { email, name, password, birthYear, birthMonth, birthDay } = values;
          const signUpBody = {
            email,
            name,
            password,
            birthday: new Date(`${birthYear}-${birthMonth!.replace('월', '')}-${birthDay}`).toISOString()
          }
          const { data } = await signupAPI(signUpBody)
          if (data) {
            alert('회원 가입이 완료 되었습니다.');
            await signIn('credentials', {
              email,
              password
            })
            closeModal();
          }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data)
        }
      }
    }
  })

  return (
    <Container>
      <div className="header">
        <h1>회원 가입</h1>
        <CloseXIcon className={'modal-close-x-icon'} onClick={closeModal} />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <InputWrapper isIcon={true}>
          <input
            placeholder='이메일 주소'
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <MaillIcon />
        </InputWrapper>
        {formik.touched.email && formik.errors.email && <div className='errorText'>{formik.errors.email}</div>}

        <InputWrapper isIcon={true}>
          <input
            placeholder='이름'
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <PersonIcon />
        </InputWrapper>
        {formik.touched.name && formik.errors.name && <div className='errorText'>{formik.errors.name}</div>}

        <InputWrapper isIcon={true}>
          <input
            placeholder='비밀번호 설정'
            name="password"
            type={hidePassword ? 'password' : 'text'}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {hidePassword ? <OpenedEyeIcon onClick={toggleHidePassword} /> : <ClosedEyeIcon onClick={toggleHidePassword} />}
        </InputWrapper>
        {formik.touched.password && formik.errors.password && <div className='errorText'>{formik.errors.password}</div>}


        <p className="sign-up-birthday-label">생일</p>
        <SelectorWrapper>
          <select
            name='birthYear'
            onChange={formik.handleChange}
            value={formik.values.birthYear}
          >
            <option value='' disabled>년</option>
            {yearList.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            name='birthMonth'
            onChange={formik.handleChange}
            value={formik.values.birthMonth}
          >
            <option value='' disabled>월</option>
            {monthList.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            name='birthDay'
            onChange={formik.handleChange}
            value={formik.values.birthDay}
          >
            <option value='' disabled>일</option>
            {dayList.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </SelectorWrapper>

        {(formik.touched.birthYear && formik.touched.birthMonth && formik.touched.birthDay) && (formik.errors.birthYear || formik.errors.birthMonth || formik.errors.birthDay) &&
        <div className='errorText'>{formik.errors.birthDay}</div>
        }

        <div className="sign-up-submit-button-wrapper">
          <Button type='submit'>가입하기</Button>
        </div>
      </form>

      <p>
        이미 계정이 있나요?
        <span className="sign-up-set-login" onClick={() => setAuthModalType('login')}>
          로그인
        </span>
      </p>
    </Container>
  )
}

export default SignUpModal