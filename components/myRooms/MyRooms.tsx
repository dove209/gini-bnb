/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import styled from 'styled-components';
import palette from '../../styles/palette';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { useMyRooms, useRemoveRoom } from '../../hooks/reactQuery/useRooms';
import { makeDateFormat, makeMoneyString } from '../../lib/utils';
import queryCache from '../../queryCache';

import Button from '../common/Button';

const Container = styled.div`
  width: 80%;
  margin: 80px auto;
  & > h1 {
    font-weight: bold;
    font-size: 1.4rem;
    margin-left: 20px;
    margin-bottom: 20px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      position: relative;
      width: 400px;
      /* height: 250px; */
      padding: 20px;
      margin: 20px;
      border: 1px solid ${palette.gray_aa};
      box-shadow: 0px 0px 10px ${palette.gray_aa};
      border-radius: 10px;
      cursor: pointer;
      .createAt {
        color: ${palette.gray_aa};
        font-size: 0.9rem;
      }
      
      .addr {
        margin-top: 8px;
        font-weight: bold;
      }

      .image-wrapper {
        position: relative;
        margin-top: 8px;
        width: 100%;
        height: 200px;
        border-radius: 5px;
        overflow: hidden;
      }

      .title {
        font-size: 1.4rem;
        font-weight: bold;
        margin-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .type {
        margin-top: 8px;
        color: ${palette.gray_aa}
      }

      .price {
        margin-top: 8px;
        b {
          font-weight: bold;
        }
      }
      button {
        margin-top: 20px;
      }
    }
  }

  .empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;




interface IProps {
  userId?: string
}

const MyRooms: React.FC<IProps> = ({ userId }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isSuccess } = useMyRooms(userId as string, {
    staleTime: 30 * 1000,
  });
  const { mutate: removeRoomMutate } = useRemoveRoom();

  const onClickCard = (roomId: string) => {
    router.push(`/room/${roomId}`)
  }


  // 등록된 숙소 제거하기
  const removeRoom = (e: React.MouseEvent<HTMLButtonElement>, roomId: string) => {
    e.stopPropagation()
    removeRoomMutate(roomId, {
      onSuccess: (data) => {
        if (data) {
          alert('숙소 등록 취소가 성공하였습니다.');
          queryClient.invalidateQueries(queryCache.myRooms(userId as string))
        }
      },
      onError: (error) => {
        alert('숙소 등록 취소가 실패하였습니다..');
        console.log(error);
      }
    })
  }

  if (isSuccess) {
    if (data.length !== 0) {
      return (
        <Container>
          <h1>등록 숙소 목록</h1>
          <ul>
            {data.map((room) => (
              <li key={room.id} onClick={() => onClickCard(room.id)}>
                <p className='createAt'>등록일: {makeDateFormat(room.updateAt, false)}</p>
                <p className="addr">{room.country} {room.city} {room.district} {room.streetAddress}</p>
                <div className='image-wrapper'>
                  <Image src={room.photos[0]} layout='fill' objectFit={'cover'} alt='숙소 대표 이미지' />
                </div>
                <h1 className='title'>{room.title}</h1>
                <p className="type">{room.largeBuildingType} - {room.buildingType} - {room.roomType}</p>
                <p className="price"><b>￦{makeMoneyString(String(room.price))}</b> /박</p>
                <Button onClick={(e) => removeRoom(e, room.id)}>등록 취소</Button>
              </li>
            ))}
          </ul>
        </Container>
      )
    } else {
      return (
        <Container>
          <h1 className="empty">등록된 숙소가 없습니다.</h1>
        </Container>
      )
    }
  }

  return <></>;
}

export default MyRooms