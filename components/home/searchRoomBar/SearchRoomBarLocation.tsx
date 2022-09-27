import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import shallow from 'zustand/shallow';
import OutsideClickHandler from 'react-outside-click-handler';

import { useSearchRoomStore } from '../../../stores/useSearchRoomStore';
import useDebounce from '../../../hooks/useDebounce';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  &:hover { 
    border-color: ${palette.gray_dd};
  };

  .search-room-bar-location-texts {
    position: absolute;
    width: calc(100% - 40px);
    top: 16px;
    left: 20px;
    .search-room-bar-location-label {
      font-size: 12px;
      font-weight: 800;
      margin-bottom: 4px;
    }

    input {
      width: 100%;
      border: 0;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &::placeholder {
        font-size: 14px;
        opacity: 0.7;
      }
    }
  }

  .search-room-bar-location-results {
    position: absolute;
    background-color: white;
    top: 78px;
    width: 500px;
    padding: 16px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    cursor: default;
    overflow: hidden;
    z-index: 10;
    li {
      display: flex;
      align-items: center;
      height: 64px;
      padding: 8px 32px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
  }
`;


interface ISearchPlace {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string
  x: string;
  y: string
}

const SearchRoomBarLocation: React.FC = () => {
  const { location, setLocation, setLatitude, setLongitude } = useSearchRoomStore(
    (state) => ({
      location: state.location,
      setLocation: state.setLocation,
      setLatitude: state.setLatitude,
      setLongitude: state.setLongitude,
    }),
    shallow
  );
  const [isPopup, setIsPopup] = useState(false);
  const searchKeyword = useDebounce(location, 150);
  const [placeList, setPlaceList] = useState<ISearchPlace[]>([]);


  const inputRef = useRef<HTMLInputElement | null>(null)



  const onClickInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsPopup(true)
  }

  /** 검색된 장소 클릭 시 */
  const onClickPlaceList = (place: ISearchPlace) => {
    setLocation(place.address_name);
    setLatitude(Number(place.y));
    setLongitude(Number(place.x));
  }

  /** 장소 검색하기 */
  const searchPlace = (location: string) => {
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(location, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        let placeArray: ISearchPlace[] = [];
        let prevPlace = '';
        //서울 용산구 이태원동 119-23
        data.forEach((place, index) => {
          if (index === 0) {
            placeArray.push(place);
          } else {
            if (place.address_name !== prevPlace) {
              placeArray.push(place);
            }
          }
          prevPlace = place.address_name;
        })
        setPlaceList([...placeArray]);

      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        //검색 결과가 없습니다.
        setPlaceList([]);
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        //검색 결과 중 오류가 발생했습니다.
        setPlaceList([]);
        return;
      }
    });
  }

  useEffect(() => {
    if (!searchKeyword) {
      setPlaceList([]);
    } else {
      searchPlace(searchKeyword);
    }
  }, [searchKeyword])
  

  return (
    <Container onClick={onClickInput}>
      <OutsideClickHandler onOutsideClick={() => setIsPopup(false)}>
        <div className="search-room-bar-location-texts">
          <p className="search-room-bar-location-label">여행지</p>
          <input
            ref={inputRef}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='어디로 여행 가세요?'
          />
        </div>
        {isPopup && (
          <ul className="search-room-bar-location-results">
            {placeList.length === 0 && <li>검색 결과가 없습니다.</li>}
            {placeList.length !== 0 &&
              placeList.map((place: ISearchPlace, index: number) => (
                <li
                  key={index}
                  onClick={() => onClickPlaceList(place)}
                >
                  {place.address_name}
                </li>
              ))
            }
          </ul>
        )}
      </OutsideClickHandler>
    </Container>
  )
}

export default SearchRoomBarLocation