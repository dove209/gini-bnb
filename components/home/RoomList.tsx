import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
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

    .room-list-room-card {
      border-radius: 15px;
      overflow: hidden;
      .photo-wrapper {
        border-radius: 15px;
        overflow: hidden;
      }
    }
`;

const ObserverDIV = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 30px;
`

const RoomList: React.FC = () => {
  const [ref, inView] = useInView();
  const { data, isSuccess, isFetching, fetchNextPage, hasNextPage } = useAllRooms('list');

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage()
    }
  }, [inView])


  if (isSuccess) {
    return (
      <>
        <Container>

          {data.pages.map((page) => (
            page.roomsList.map((room) =>
              <li className='room-list-room-card' key={room.id} >
                <RoomCard room={room} />
              </li>
            )
          ))}

        </Container>
        <ObserverDIV ref={ref}></ObserverDIV>
      </>
    )
  }
  if (isFetching) {
    return <div>로딩중...</div>
  }
  return <></>
}

export default RoomList