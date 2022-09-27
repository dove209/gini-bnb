import React from 'react';
import styled, { css } from 'styled-components';
import { StoredRoomType } from '../../../types/room';
import RoomCard from './RoomCard';

const Container = styled.ul<{ showMap: boolean }>`
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    width: 100%;
    ${({ showMap }) =>
        showMap &&
        css`
            flex-direction: column;
        `
    }
`;

interface IProps {
    showMap: boolean;
    rooms: StoredRoomType[]
}
const RoomList: React.FC<IProps> = ({ showMap, rooms }) => {
  return (
    <Container showMap={showMap}>
        {rooms.map((room) => (
            <RoomCard room={room} key={room.id} showMap={showMap}  />
        ))}
    </Container>
  )
}

export default RoomList