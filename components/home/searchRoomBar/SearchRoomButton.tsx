import React from 'react'
import Button from '../../common/Button';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';
import { useSearchRoomStore } from '../../../stores/useSearchRoomStore';
import { makeQueryString } from '../../../lib/utils';

const SearchRoomButton = () => {
  const router = useRouter();

  const { location, latitude, longitude, checkInDate, checkOutDate, adultCount, childrenCount, infantsCount } = useSearchRoomStore(
    (state) => ({
        location: state.location,
        latitude: state.latitude,
        longitude: state.longitude,
        checkInDate: state.checkInDate,
        checkOutDate: state.checkOutDate,
        adultCount: state.adultCount,
        childrenCount: state.childrenCount,
        infantsCount: state.infantsCount,
    }),
    shallow
  )


  const onClickSearchRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!!location && !!latitude && !!longitude && !!checkInDate && !!checkOutDate) {
        const queriesObject = {
          location,
          latitude,
          longitude,
          checkInDate,
          checkOutDate,
          adultCount,
          childrenCount,
          infantsCount
        }
        const roomListHref = makeQueryString('/room', queriesObject);
        router.push(roomListHref);
    }
  }

  return (
    <Button onClick={onClickSearchRoom}>검색</Button>
  )
}

export default SearchRoomButton