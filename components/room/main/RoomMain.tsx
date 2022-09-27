import React from 'react'
import styled from 'styled-components';

import { useRooms } from '../../../hooks/reactQuery/useRooms';
import { GetRoomListAPIQueries } from '../../../types/room';

import RoomList from './RoomList';

const Container = styled.div`
    padding: 50px 80px;
    margin: auto;

    .room-list-info {
        margin-bottom: 8px;
    }

    .room-list-wrapper {
        display: flex;
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
        <p className='room-list-info'>숙소 {data?.data?.length}개</p>
        <div className='room-list-wrapper'>
          <RoomList rooms={data.data} />
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