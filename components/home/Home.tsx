import React from 'react';
import styled from 'styled-components';

import SearchRoomBar from './searchRoomBar/SearchRoomBar';
import RoomList from './RoomList';


const Container = styled.div`
    width: 100%;
    padding: 0 80px;
    
    .home-search-bar-label {
        margin: 32px 0 16px;
        font-size: 1.5rem;
        text-align: center;
    }
`;

const Home = () => {
  return (
    <Container>
        <p className="home-search-bar-label">숙소</p>
        <SearchRoomBar />
        <RoomList />
    </Container>
  )
}

export default Home