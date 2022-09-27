import React from 'react'
import styled from 'styled-components'
import palette from '../../../styles/palette';

import SearchRoomBarLocation from './SearchRoomBarLocation';
import SearchRoomBarCheckInData from './SearchRoomBarCheckInDate';
import SearchRoomBarCheckOutData from './SearchRoomBarCheckOutDate';
import SearchRoomGuests from './SearchRoomGuests';

const Container = styled.div`
    width: 50%;
    height: 70px;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    margin: 0 auto;
    
    .search-room-bar-inputs {
      display: flex;
      align-items: center;
      width: 100%;
      .search-room-bar-input-divider {
        width: 1px;
        height: 44px;
        background-color: ${palette.gray_dd};
      }
    }
`;

const SearchRoomBar: React.FC = () => {
  return (
    <Container>
        <div className="search-room-bar-inputs">
          <SearchRoomBarLocation />
          <div className="search-room-bar-input-divider" />
          <SearchRoomBarCheckInData />
          <div className="search-room-bar-input-divider" />
          <SearchRoomBarCheckOutData />
          <div className="search-room-bar-input-divider" />
          <SearchRoomGuests />

        </div>
    </Container>
  )
}

export default SearchRoomBar