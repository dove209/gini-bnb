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

import Input from '../common/Input';
import Selector from '../common/Selector';
import Button from '../common/Button';

import { signupAPI } from '../../lib/api/auth';
import { signIn } from 'next-auth/react';


const Container = styled.div`
    width: 568px;
    height: 614px;
    padding: 32px;
    background-color: white;
    z-index: 11;

    .modal-close-x-icon {
      cursor: pointer;
      display: block;
      margin: 0 0 40px auto;
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

interface IProps {
  closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {

  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();


  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  }

  const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  }

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  // 비밀번호 숨김 토글하기
  const toggleHidePassword = () => {
    setHidePassword((prevState) => !prevState)
  }

  // 생년월일 변경 시
  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  }
  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value);
  }
  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value);
  }

  // 회원가입 폼 제출하기
  const onSubmitSignUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const signUpBody = {
        email,
        lastname,
        firstname,
        password,
        birthday: new Date(`${birthYear}-${birthMonth!.replace('월','')}-${birthDay}`).toISOString()
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
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data)
      }
    }
  }

  return (
    <Container>
      <CloseXIcon className={'modal-close-x-icon'} onClick={closeModal}/>
      <div className="input-wrapper">
        <Input placeholder='이메일 주소' name='email' type={'email'} icon={<MaillIcon />} value={email} onChange={onChangeEmail} />
      </div>

      <div className="input-wrapper">
        <Input placeholder='이름(예: 길동)' icon={<PersonIcon />} value={lastname} onChange={onChangeLastname} />
      </div>

      <div className="input-wrapper">
        <Input placeholder='성(예: 홍)' icon={<PersonIcon />} value={firstname} onChange={onChangeFirstname} />
      </div>

      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input 
          placeholder='비밀번호 설정하기'
          type={hidePassword ? 'password' : 'text'}
          icon={ hidePassword ? <OpenedEyeIcon onClick={toggleHidePassword} /> : <ClosedEyeIcon onClick={toggleHidePassword} />}
          value={password}
          onChange={onChangePassword}
        />  
      </div>

      <p className="sign-up-birthday-label">생일</p>
      

      <div className="sign-up-birthday-selectors-wrapper">
        <div className="selector">
          <Selector 
            options={yearList}
            disabledOptions={['년']}
            defaultValue='년'
            value={birthYear}
            onChange={onChangeBirthYear}
          />
        </div>
        <div className="selector">
          <Selector 
            options={monthList}
            disabledOptions={['월']}
            defaultValue='월'
            value={birthMonth}
            onChange={onChangeBirthMonth}
          />
        </div>
        <div className="selector">
          <Selector 
            options={dayList}
            disabledOptions={['일']}
            defaultValue='일'
            value={birthDay}
            onChange={onChangeBirthDay}
          />
        </div>
      </div>

      <div className="sign-up-submit-button-wrapper">
        <Button type='submit' onClick={onSubmitSignUp}>가입하기</Button>
      </div>

      </Container>
  )
}

export default SignUpModal