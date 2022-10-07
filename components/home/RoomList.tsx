import React from 'react';
import styled from 'styled-components';
import { useAllRooms } from '../../hooks/reactQuery/useRooms';

import RoomCard from '../room/main/RoomCard';

const Container = styled.ul`
    margin: 60px auto 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 40px;
    padding: 10px 0px;
    width: 100%;
    max-width: 1500px;
    min-width: 600px;
`;

const RoomList: React.FC = () => {
  const { data, isSuccess, isLoading, fetchNextPage, hasNextPage } = useAllRooms();
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }
  if (isSuccess) {
    return (
      <>
        <Container>
          {data.pages.map((page) => (
            page.roomsList.map((room) =>
              <RoomCard room={room} key={room.id} />
            )
          ))}
        </Container>
        <button onClick={loadMore}>더 불러오기</button>
      </>
    )
  }
  if (isLoading) {
    return <div>로딩중...</div>
  }
  return <></>
}

export default RoomList