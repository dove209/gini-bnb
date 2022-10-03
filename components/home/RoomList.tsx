import React from 'react';
import styled from 'styled-components';
import { useAllRooms } from '../../hooks/reactQuery/useRooms';

import RoomCard from '../room/main/RoomCard';

const Container = styled.ul`
    margin-top: 60px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 40px;
    padding: 10px 0px;
    width: 100%;
`;

const RoomList: React.FC = () => {
  const { data: AllRoomsList, isSuccess, isLoading } = useAllRooms();
  if (isSuccess) {
    return (
        <Container>
            {AllRoomsList.data.map((room) => (
                <RoomCard room={room} key={room.id} />
            ))}
        </Container>
    )
  }
  if (isLoading) {
    return <div>로딩중...</div>
  }
  return <></>
}

export default RoomList