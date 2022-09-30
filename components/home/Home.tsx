import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

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

    h2 {
        width: 557px;
        margin: 80px 0 60px;
        font-size: 50px;
        color: ${palette.cardinal};
    }
`;

const Home = () => {
  return (
    <Container>
        <p className="home-search-bar-label">숙소</p>
        <SearchRoomBar />
        <h2>가까운 여행지, 에어비엔비와 탐험해보세요.</h2>
        <RoomList />
    </Container>
  )
}

export default Home