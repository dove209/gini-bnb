/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import { useRoom } from "../../../hooks/reactQuery/useRooms";
import RoomDetailReservation from "./RoomDetailReservation";

const Container = styled.div`
  width: 1120px;
  margin: auto;
  padding-top: 24px;
  padding-bottom: 100px;
  .room-detail-title {
    font-size: 26px;
    font-weight: 800;
    margin-bottom: 24px;
  }

  .room-detail-location {
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
    margin-bottom: 24px;
  }

  .room-photos-wrapper {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 48px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
      &:hover {
        filter: brightness(80%);
      }
    }
    .left {
      width: 560px;
      height: 100%;
    }
    .right {
      width: 552px;
      height: 100%;
    }
    .right-top {
      height: 246px;
    }
    .right-bottom {
      margin-top: 8px;
      height: 246px;
      display: flex;
      justify-content: space-between;
      & > div {
        width: calc(50% - 4px);
        height: 100%;
      }
    }
  }

  .room-detail-contents {
    position: relative;
    height: 100%;
    display: flex;
    .room-detail-infos {
      width: 644px;
      .room-detail-space-counts {
        font-size: 14px;
      }
      .room-detail-description {
        font-size: 16px;
        line-height: 20px;
      }
      .room-detail-conveniences-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
          display: flex;
          align-items: center;
          width: 50%;
          padding-bottom: 16px;
        }
      }
    }
  }

  .map-wrapper {
    width: 100%;
    height: 480px;
  }

  .room-detail-divider {
    width: 100%;
    height: 1px;
    background-color: ${palette.gray_dd};
    margin: 32px 0;
  }
`;

interface IProps {
  roomId: string;
}

const RoomDetail: React.FC<IProps> = ({ roomId }) => {
  const { data: room, isSuccess, isLoading } = useRoom(roomId);

  console.log(room)
  if (isSuccess) {
    return (
      <Container>
        <h1 className="room-detail-title">{room.title}</h1>
        <p className="room-detail-location">
          {room.district}, {room.city}, {room.country}
        </p>

        <div className="room-photos-wrapper">
          <div className="left">
            <img src={room.photos[0]} alt="" />
          </div>

          <div className="right">
            <div className="right-top">
              <img src={room.photos[1]} alt="" />
            </div>
            <div className="right-bottom">
              <div>
                <img src={room.photos[2]} alt="" />
              </div>
              <div>
                <img src={room.photos[3]} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="room-detail-contents">
            <div className="room-detail-infos">
                <p className="room-detail-title">{room.roomType}</p>
                <p className="room-detail-space-counts">
                최대 인원 {room.maximumGuestCount}명 · 침실 {room.bedroomCount}개
                · 침대 {room.bedCount}개 · 욕실 {room.bathroomCount}개
                </p>
                <div className="room-detail-divider" />
                <p className="room-detail-title">숙소 설명</p>
                <p className="room-detail-description">{room.description}</p>
                <div className="room-detail-divider" />

                <p className="room-detail-title">숙소 편의시설</p>
                <ul className="room-detail-conveniences-list">
                {room.conveniences.map((amentity, index) => (
                    <li key={index}>{amentity}</li>
                ))}
                {room.popularConveniences.map((amentity, index) => (
                    <li key={index}>{amentity}</li>
                ))}
                {room.safetyGoods.map((amentity, index) => (
                    <li key={index}>{amentity}</li>
                ))}
                </ul>
            </div>

            <RoomDetailReservation room={room} /> 
        </div>

        <section>
          <div className="room-detail-divider" />
          <p className="room-detail-title">호스팅 지역</p>
          <div className="map-wrapper">
            <Map
              center={{
                lat: Number(room.latitude),
                lng: Number(room.longitude),
              }}
              style={{ width: "100%", height: "100%" }}
              level={7}
            >
              <MapMarker
                position={{
                  lat: Number(room.latitude),
                  lng: Number(room.longitude),
                }}
              />
            </Map>
          </div>
          <p className="room-detail-location">
            {room.streetAddress}, {room.district}, {room.city}, {room.country}
          </p>
        </section>

        <section>
          <div className="room-detail-divider" />
          <p className="room-detail-title">후기</p>
        </section>


        <section>
          <div className="room-detail-divider" />
          <p className="room-detail-title">호스트 정보</p>
        </section>


        <section>
          <div className="room-detail-divider" />
          <p className="room-detail-title">알아두어야 할 사항</p>
        </section>
      </Container>
    );
  }

  if (isLoading) {
    return <div>로딩중....</div>;
  }
  return <></>;
};

export default RoomDetail;
