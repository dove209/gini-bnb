import React, { useState } from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import Image from "next/image";
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
    right: 0;
    top: 70px;
    width: 240px;
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
    userProfileImage: string
}
const HeaderUserProfile: React.FC<IProps> = ({ userProfileImage }) => {
  return (
    <Container>
        <button
          className="header-user-profile"
          type="button"
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
    </Container>
  );
};

export default HeaderUserProfile;
