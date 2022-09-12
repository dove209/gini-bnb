import Link from "next/link";
import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import { useSession } from "next-auth/react";

import LogoIcon from "../public/static/svg/logo/logo.svg";
import LogoTextIcon from "../public/static/svg/logo/logo_text.svg";

import HeaderAuths from "./HeaderAuths";
import HeaderUserProfile from "./HeaderUserProfile";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }

  /* 헤더 회원가입, 로그인 버튼 */
  .header-auth-buttons {
    button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &.sign-up-button {
        &:hover {
          background-color: ${palette.gray_f7};
        }
      }
    }
    button + button {
      margin-left: 8px;
      &.login-button {
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
        &:hover {
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
        }
      }
    }
  }

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
`;

const Header: React.FC = () => {
  const { data: sesstion, status } = useSession();
  const userProfileImage = sesstion?.user?.image || '/static/image/user/default_user_profile_image.jpg';

  return (
    <Container>
      <Link href={"/"}>
        <a className="header-logo-wrapper">
          <LogoIcon className="header-logo" />
          <LogoTextIcon />
        </a>
      </Link>

      {status !== "loading" ? (
        status === "authenticated" ? (
          <HeaderUserProfile userProfileImage={userProfileImage} />
        ) : (
          <HeaderAuths />
        )
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Header;
