import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "styled-components";
import palette from "../styles/palette";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react"

import HamburgetIcon from "../public/static/svg/header/hamburger.svg";

const Container = styled.div`
  /* 유저 프로필 */
  .header-user-profile {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 42px;
    width: 70px;
    border: transparent;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }
    .header-user-profile-image {
      border-radius: 50% !important;
    }
  }

  /* react-outside-click-handler div */
  .header-logo-wrapper + div {
    position: relative;
  }
  .header-usermenu {
    position: absolute;
    right: 20px;
    top: 70px;
    width: 200px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: #fff;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
      background-color: ${palette.gray_dd};
    }
  }
`;

interface IProps {
  userProfileImage: string;
}
const HeaderUserProfile: React.FC<IProps> = ({ userProfileImage }) => {
  // 유저 메뉴 열고, 닫히 여부
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);

  // 로그아웃 하기
  const logout = () => {
    signOut();
    setIsUserMenuOpened(false);
  }

  return (
    <Container>
      <OutsideClickHandler
        onOutsideClick={() => {
          if (isUserMenuOpened) {
            setIsUserMenuOpened(false)
          }
        }}
      >
        <button 
          className="header-user-profile"
          type="button"
          onClick={() => setIsUserMenuOpened(prevState => !prevState)}
        >
          <HamburgetIcon />
          <Image
            src={userProfileImage}
            alt="유저 프로필 이미지"
            width={30}
            height={30}
            className="header-user-profile-image"
          />
        </button>

        {isUserMenuOpened && (
          <ul className="header-usermenu">
            <li>숙소 관리</li>
            <Link href={'/room/register/building'}>
              <a onClick={() => setIsUserMenuOpened(false)}>
                <li>숙소 등록하기</li>
              </a>
            </Link>
            <div className="header-username-divider"></div>
            <li onClick={logout}>
              로그아웃
            </li>
          </ul>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default HeaderUserProfile;
