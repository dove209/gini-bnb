/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styled from 'styled-components';
import palette from '../../../styles/palette';
import Link from 'next/link';
import { useRouter } from 'next/router';
import differenceInDays from 'date-fns/differenceInDays';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useHoveredRoomStore } from '../../../stores/useHoverRoomStore';

import { StoredRoomType } from '../../../types/room';
import { makeMoneyString } from '../../../lib/utils';

const Container = styled.li`
    width: 100%;
    overflow: hidden;
    .photo-wrapper {
        height: 340px;
        position: relative;
        overflow: hidden;
        border-radius: 15px;
        margin-bottom: 14px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
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
        font-size: 14px;
        font-weight: normal;
        color: ${palette.gray_aa};
        margin-bottom: 9px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 20px;
    }
    .room-card-price {
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

const StyledSlider = styled(Slider)`
    &:hover {
        .slick-arrow {
            display: block !important;
        }
    }
    .slick-arrow {
        display: none !important;
        position: absolute;
        z-index: 1;
    }
    .slick-disabled::before {
        display: none;
    }
    .slick-prev {
        left: 10px;
        &::before {
            font-size: 30px;
        }
    }
    .slick-next {
        right: 20px;
        &::before {
            font-size: 30px;
        }
    }
    .slick-dots {
        position: absolute;
        bottom: 8%;
        li {
            width: 5px;
            height: 5px;
            &.slick-active {
                button {
                    &:before {
                        color : white;
                    }
                }
            }
        }
    }
`;

interface IProps {
    room: StoredRoomType;
}


const RoomCard: React.FC<IProps> = ({ room }) => {
    const router = useRouter();
    const { checkInDate, checkOutDate } = router.query;

    const setHoveredRoomId = useHoveredRoomStore((state) => state.setHoveredRoomId);

    const remainDays = checkInDate && checkOutDate && differenceInDays(new Date(checkOutDate as string), new Date(checkInDate as string));

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Container
            onMouseOver={() => setHoveredRoomId(room.id)}
            onMouseOut={() => setHoveredRoomId(null)}
        >
            <Link href={`/room/${room.id}`}>
                <a target="_blank">
                    <StyledSlider {...settings}>
                        <div className='photo-wrapper'>
                            <img src={room.photos[0]} alt='' />
                        </div>
                        <div className='photo-wrapper'>
                            <img src={room.photos[1]} alt='' />
                        </div>
                        <div className='photo-wrapper'>
                            <img src={room.photos[2]} alt='' />
                        </div>
                        <div className='photo-wrapper'>
                            <img src={room.photos[3]} alt='' />
                        </div>
                    </StyledSlider>
        

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
