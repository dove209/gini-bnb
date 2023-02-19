import React, { useState } from 'react';
import styled from 'styled-components';

import { Map, MarkerClusterer, CustomOverlayMap } from "react-kakao-maps-sdk";
import { makeMoneyString } from '../../lib/utils';
import { useAllRooms } from '../../hooks/reactQuery/useRooms';

import RoomCard from '../room/main/RoomCard';


const Container = styled.ul`
    width: 100%;
    margin-top: 20px;
    height: calc(100vh - 80px - 72px - 70px - 20px); //header: 80px, 숙소타이틀: 72px, 검색창:70px, 컨테이터 margitTop: 20px;
    .room-map-price-overlay {
        padding: 0 10px;
        height: 30px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        box-shadow: 1px 3px 5px rgba(0,0,0,0.5);
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s;
        &:hover, &.active {
            transform: scale(1.1);
            background-color:  black;
            color: white;
        }
    }

    .room-map-room-card {
      position: relative;
      border-radius: 15px;
      overflow: hidden;
      width: 300px;
      background-color: white;
      z-index: 999;
      
      .close-overlay { 
        position: absolute;
        top: 10px;
        left: 10px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: rgba(0,0,0,0.4);
        color: white;
        font-size: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        cursor: pointer;
      }

      .photo-wrapper {
        height: 200px !important;
      }

      .slick-dots {
        bottom: 15% !important;
      }

      .room-card-info-texts {
        padding: 0 10px 20px;
      }
    }
  `;

const RoomMap: React.FC = () => {
  const { data } = useAllRooms('map');
  const [selectedIdx, setSelectedIndx] = useState(-1);
  return (
    <Container>
      <Map
        center={{
          lat: Number(data?.pages[0]?.roomsList[0]?.latitude),
          lng: Number(data?.pages[0]?.roomsList[0]?.longitude)
        }}
        style={{ width: "100%", height: "100%" }}
        level={7}
        disableDoubleClickZoom={true}
        onRightClick={() => setSelectedIndx(-1)}
      >
        <MarkerClusterer averageCenter={true} minLevel={10}>
          {data?.pages[0].roomsList.map((room, index) => (
            <div key={room.id}>

              {/* 가격 오버레이 */}
              <CustomOverlayMap
                position={{
                  lat: Number(room.latitude),
                  lng: Number(room.longitude)
                }}
                yAnchor={-0.3}
              >
                <div
                  className={index === selectedIdx ? 'room-map-price-overlay active' : 'room-map-price-overlay'}
                  onClick={() => setSelectedIndx(index)}
                >
                  ￦{makeMoneyString(String(room.price))}
                </div>
              </CustomOverlayMap>

              {/* 숙소 카드 (in Map) */}
              {index === selectedIdx && (
                <CustomOverlayMap
                  position={{
                    lat: Number(room.latitude),
                    lng: Number(room.longitude)
                  }}
                  yAnchor={1}
                >
                  <div className='room-map-room-card'>
                    <div className='close-overlay' onClick={() => setSelectedIndx(-1)}>X</div>
                    <RoomCard room={room} />
                  </div>
                </CustomOverlayMap>
              )}
            </div>
          ))}
        </MarkerClusterer>
      </Map>
    </Container>
  )
}

export default RoomMap
