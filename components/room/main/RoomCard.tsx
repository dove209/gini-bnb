/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styled from 'styled-components';
import palette from '../../../styles/palette';
import Link from 'next/link';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';
import differenceInDays from 'date-fns/differenceInDays';

import { useSearchRoomStore } from '../../../stores/useSearchRoomStore';
import { StoredRoomType } from '../../../types/room';
import { makeMoneyString } from '../../../lib/utils';

const Container = styled.li`
    width: calc((100% - 48px) / 4);
    &:nth-child(4n) {
        margin-right: 0;
    }
    margin-right: 16px;
    margin-bottom: 32px;

    @media (min-width: 1440px) { 
        width: calc((100% - 64px) / 5);
        &:nth-child(4n) {
            margin-right: 16px;
        }
        &:nth-child(5n) {
            margin-right: 0px;
        }
    }
    .room-card-photo-wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 66.6666%;
        margin-bottom: 14px;
        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    .room-card-room-info {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 9px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .room-card-title {
        font-size: 16px;
        color: ${palette.gray_71};
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .room-card-price {
        margin-bottom: 4px;
        b {
            font-weight: bold;
        }
    }
    .room-card-total-price {
        font-size: 14px;
        color: ${palette.gray_71};
    }
    .room-bed-bath-room-info {
        display: none;
    }
`;

interface IProps {
    room: StoredRoomType;
}


const RoomCard: React.FC<IProps> = ({ room }) => {
    const router = useRouter();
    const { checkInDate, checkOutDate } = router.query;

    const remainDays = checkInDate && checkOutDate && differenceInDays(new Date(checkOutDate as string), new Date(checkInDate as string));
        
    return (
        <Container>
            <Link href={`/room/${room.id}`}>
                <a>
                    <div className='room-card-photo-wrapper'>
                        <img src={room.photos[0]} alt='' />
                    </div>

                    <div className='room-card-info-texts'>
                        <p className='room-card-room-info'>
                            {room.buildingType} / {room.city}
                        </p>
                        <p className='room-card-title'>
                            {room.title} <br />
                            침대 {room.bedCount}개
                        </p>

                        <p className='room-card-price'>
                            <b>￦{makeMoneyString(String(room.price))}</b> /박
                            {!!remainDays && (
                                <span className='room-card-total-price'>
                                    · 총 요금: ￦ {makeMoneyString(`${Number(room.price) * remainDays}`)}
                                </span>
                            )}
                        </p>
       
                    </div>
                </a>
            </Link>
        </Container>
    )
}

export default RoomCard
