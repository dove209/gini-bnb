import React from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import shallow from 'zustand/shallow';

import { useSearchRoomStore } from '../../../stores/useSearchRoomStore';
import DatePicker from '../../common/Datepicker';

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
  .search-room-bar-date-label {
    font-size: 12px;
    font-weight: 800;
    margin-bottom: 4px;
    position: absolute;
    z-index: 1;
    left: 20px;
    top: 16px;
  }
  input {
    width: 100%;
    height: 100%;
    padding: 20px 0 0 20px;
    border: 0;
    border-radius: 12px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
  }
  > div {
    width: 100%;
    height: 100%;
    .react-datepicker-wrapper {
      width: 100%;
      height: 100%;
      .react-datepicker__input-container {
        width: 100%;
        height: 100%;
      }
    }
    .react-datepicker {
      display: flex;
    }
  }
`;


const SearchRoomBarCheckOutDate: React.FC = () => {
  const { checkInDate, checkOutDate, setCheckOutDate } = useSearchRoomStore(
    (state) => ({
      checkInDate: state.checkInDate ? new Date(state.checkInDate) : null,
      checkOutDate: state.checkOutDate ? new Date(state.checkOutDate) : null,
      setCheckOutDate: state.setCheckOutDate
    }),
    shallow
  );

  /** 체크아웃 날짜 변경 시 */
  const onChangeCheckInDate = (date: Date | null) => {
      setCheckOutDate(date?.toISOString() ?? null);
  }
  return (
    <Container>
      <div>
        <p className="search-room-bar-date-label">체크아웃</p>
        <DatePicker 
          selected={checkOutDate}
          selectsEnd
          monthsShown={1}
          onChange={onChangeCheckInDate}
          startDate={checkInDate}
          endDate={checkOutDate}
          placeholderText="날짜 추가"
          minDate={checkInDate}
        />
      </div>
    </Container>
  )
}

export default SearchRoomBarCheckOutDate;