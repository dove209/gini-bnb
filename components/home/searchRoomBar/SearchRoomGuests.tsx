import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import shallow from 'zustand/shallow';
import OutsideClickHandler from 'react-outside-click-handler';

import Counter from '../../common/Counter';
import SearchRoomButton from './SearchRoomButton';

import { useSearchRoomStore } from '../../../stores/useSearchRoomStore';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  &:hover { 
    border-color: ${palette.gray_dd};
  }

  > div {
    width: 100%;
    height: 100%;
  }

  .search-room-bar-guests-texts {
    position: absolute;
    width: calc(100% - 114px);
    top: 16px;
    left: 20px;
  }

  .search-room-bar-guests-label {
    font-size: 12px;
    font-weight: 800;
    margin-bottom: 4px;
  }

  .search-room-bar-guests-popup {
    position: absolute;
    width: 394px;
    top: 78px;
    right: 0;
    padding: 16px 32px;
    background-color: white;
    border-radius: 32px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
    cursor: default;
    z-index: 1;
  }

  .search-room-bar-guests-counter-wrapper {
    padding: 32px 0;
    border-bottom: 1px solid ${palette.gray_eb};
    &:last-child {
      border: 0;
    }
  }

  .search-room-bar-guests-text {
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .search-room-bar-button-wrapper {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 80px;
  }
`;

const SearchRoomGuests = () => {
  const [isPopup, setIsPopup] = useState(false);

  const { adultCount, childrenCount, infantsCount, setAdultCount, setChildrenCount, setInfantsCount } = useSearchRoomStore(
    (state) => ({
      adultCount: state.adultCount,
      childrenCount: state.childrenCount,
      infantsCount: state.infantsCount,
      setAdultCount: state.setAdultCount,
      setChildrenCount: state.setChildrenCount,
      setInfantsCount: state.setInfantsCount,
    }),
    shallow
  )


  return (
    <Container onClick={() => setIsPopup(true)}> 
      <OutsideClickHandler onOutsideClick={() => setIsPopup(false)}>
        <div className="search-room-bar-guests-texts">
          <p className="search-room-bar-guests-label">여행자</p>
          <p className="search-room-bar-guests-text">
            게스트 {(adultCount + childrenCount)}명
            {infantsCount > 0 && `, 유아${infantsCount}명`}
          </p>
        </div>

        <div className="search-room-bar-button-wrapper">
          <SearchRoomButton />
        </div>

        {isPopup && (
          <div className="search-room-bar-guests-popup">
            <div className="search-room-bar-guests-counter-wrapper">
              <Counter 
                label='성인'
                description='만 13세 이상'
                value={adultCount}
                onChange={(count) => setAdultCount(count)}
              />
            </div>

            <div className="search-room-bar-guests-counter-wrapper">
              <Counter 
                label='어린이'
                description='만 2~12세'
                value={childrenCount}
                onChange={(count) => setChildrenCount(count)}
              />
            </div>

            <div className="search-room-bar-guests-counter-wrapper">
              <Counter 
                label='유아'
                description='만 2세 미만'
                value={infantsCount}
                onChange={(count) => setInfantsCount(count)}
              />
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </Container>
  )
}

export default SearchRoomGuests