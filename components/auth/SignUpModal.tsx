import React, { useState } from 'react'
import { AxiosError } from 'axios';
import styled from 'styled-components'
import palette from '../../styles/palette';

import { yearList, monthList, dayList } from '../../lib/staticData';
import CloseXIcon from '../../public/static/svg/modal/modal_close_x_icon.svg';
import MaillIcon from '../../public/static/svg/auth/mail.svg';
import PersonIcon from '../../public/static/svg/auth/Person.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';

import Button from '../common/Button';

import { useFormik } from 'formik';

import { signupAPI } from '../../lib/api/auth';
import { signIn } from 'next-auth/react';


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
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid ${palette.gray_eb}
    }
`;


const InputWrapper = styled.div<{ isIcon?: boolean }>`
  position: relative;
      height: 46px;
      margin-bottom: 16px;
      input {
        width: 100%;
        height: 100%;
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
    margin-bottom: 24px;
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
  const [hidePassword, setHidePassword] = useState(true);  

  // 비밀번호 숨김 토글하기
  const toggleHidePassword = () => {
    setHidePassword((prevState) => !prevState)
  }


  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      birthYear: '',
      birthMonth: '',
      birthDay: '',
    },
    onSubmit: values => {
      try {
        (async () => {
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
              id: data.id,
              email: data.email,
            })
            closeModal();
          }
        })()
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
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <MaillIcon />
        </InputWrapper>

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

        <div className="sign-up-submit-button-wrapper">
          <Button type='submit'>가입하기</Button>
        </div>
      </form>
    </Container>
  )
}

export default SignUpModal