import React from 'react'
import styled from 'styled-components';

import { useRooms } from '../../../hooks/reactQuery/useRooms';
import { GetRoomListAPIQueries } from '../../../types/room';

import RoomList from './RoomList';
import RoomListMap from './RoomListMap';

const Container = styled.div`
    margin: auto;
    height: calc(100vh - 80px);
    display: flex;

    .room-list-wrapper {
      flex: 1.6;
      padding: 0 24px;
      overflow: hidden;
      .header {
        height: 40px;
        margin: 24px 0 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        h1 {
          font-size: 14px;
          font-weight: 800;
        }
      }
    }

    .room-list-map-wrapper {
      flex:1
    }

`

interface IProps {
  queries: GetRoomListAPIQueries
}


const RoomMain: React.FC<IProps> = ({ queries }) => {
  const { data, isSuccess, isLoading } = useRooms(queries);
  if (isSuccess) {
    return (
      <Container>
        <div className='room-list-wrapper'>
          <div className="header">
            <h1>
              숙소 {data?.data?.length}개
            </h1>
          </div>
          <RoomList rooms={data.data} />
        </div>
        <div className='room-list-map-wrapper'>

        </div>

      </Container>
    )
  }
  if (isLoading) {
    return <div>로딩중...</div>
  }
  return <></>
}

export default RoomMain