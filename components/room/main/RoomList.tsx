import React from 'react';
import styled from 'styled-components';
import { StoredRoomType } from '../../../types/room';
import RoomCard from './RoomCard';

const Container = styled.ul`
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    width: 100%;
`;

interface IProps {
    rooms: StoredRoomType[]
}
const RoomList: React.FC<IProps> = ({ rooms }) => {
  return (
    <Container>
        {rooms.map((room) => (
            <RoomCard room={room} key={room.id} />
        ))}
    </Container>
  )
}

export default RoomList