import React, { useState, Suspense } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import ErrorBoundary from '../common/ErrorBoundary';

import SearchRoomBar from './searchRoomBar/SearchRoomBar';
import RoomList from './RoomList';
import RoomMap from './RoomMap';


const Container = styled.div`
    width: 100%;
    .home-search-bar-label {
        margin: 32px 0 16px;
        font-size: 1.5rem;
        text-align: center;
    }

    .list-map-toggle {
      position: fixed;
      z-index: 9;
      left: 50%;
      bottom: 3%;
      transform: translateX(-50%);
      padding: 15px 30px;
      background-color: ${palette.black};
      color: white;
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 1px 2px 20px rgba(0,0,0,0.5);
      transition: all 0.2s;
      &:hover {
        transform: translateX(-50%) scale(1.05);
      }
    }
`;

const Home = () => {
  const [type, setType] = useState('list');
  
  const toggleType = () => {
    setType((state) => state === 'list' ? 'map' : 'list');
  }

  return (
    <Container>
        <p className="home-search-bar-label">숙소</p>
        <SearchRoomBar />
        <Suspense fallback={<div className='loading-text'>불러오는중...</div>}>
          <ErrorBoundary>
            {type === 'list' && <RoomList />} 
            {type === 'map' && <RoomMap />}
          </ErrorBoundary>
        </Suspense>
        <div className="list-map-toggle" onClick={toggleType}>
          {type === 'list' ? '지도 표시하기' : '목록 보기'}
        </div>
    </Container>
  )
}

export default Home