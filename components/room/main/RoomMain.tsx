import React, { useState } from 'react'
import styled, { css } from 'styled-components';
import MapIcon from '../../../public/static/svg/room/main/map.svg';
import palette from '../../../styles/palette';

import { useRooms } from '../../../hooks/reactQuery/useRooms';
import { GetRoomListAPIQueries } from '../../../types/room';

import RoomList from './RoomList';

const Container = styled.div<{ showMap: boolean }>`
    padding: 50px 80px;
    margin: auto;

    .room-list-info {
        margin-bottom: 8px;
    }
    .room-list-title {
        font-size: 32px;
        font-weight: 800;
        margin-bottom: 24px;
    }
    .room-list-buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .room-list-buttons-left-side {
            display: flex;
            button {
                height: 36px;
                padding: 0 16px;
                margin-right: 8px;
                border-radius: 30px;
                border: 1px solid ${palette.gray_b0};
                background-color: #fff;
                cursor: pointer;
                outline: none;
                &:hover {
                    border-color: ${palette.black};
                }
            }
        }
        .room-list-show-map-button {
            display: flex;
            align-items: center;
            height: 42px;
            padding: 12px;
            background-color: #fff;
            border-radius: 8px;
            border: 0;
            cursor: pointer;
            outline: none;
            &:hover {
                background-color: ${palette.gray_f7};
            }
            svg {
                margin-right: 8px;
            }
        }
    }
    .room-list-wrapper {
        display: flex;
    }

    ${({ showMap }) =>
    showMap &&
    css`
            width: 840px;
            padding: 50px 24px;
            margin: 0;
        `}
    .flex {
        display: flex;
    }
`

interface IProps {
  queries: GetRoomListAPIQueries
}


const RoomMain: React.FC<IProps> = ({ queries }) => {
  const { data, isSuccess } = useRooms(queries);
  const [showMap, setShowMap] = useState(false);

  if (isSuccess) {
    return (
      <Container showMap={showMap}>
        <p className='room-list-info'>{data?.data?.length}개의 숙소</p>
        <h1 className='room-list-title'>숙소</h1>
        <div className='room-list-buttons'>
          <div className='room-list-buttons-left-side'>
            <button type='button'>숙소 유형</button>
            <button type='button'>요금</button>
          </div>
          {!showMap && (
            <button
              type='button'
              className='room-list-show-map-button'
              onClick={() => setShowMap(!showMap)}
            >
              <MapIcon /> 지도 표시하기
            </button>
          )}
        </div>
        <div className='room-list-wrapper'>
          <RoomList showMap={showMap} rooms={data.data} />
          {/* {showMap && <RoomListMap setShowMap={setShowMap} />} */}
        </div>
      </Container>
    )
  }
  return <></>
}

export default RoomMain