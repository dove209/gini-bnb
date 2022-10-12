import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useHoveredRoomStore } from '../../../stores/useHoverRoomStore';
import { StoredRoomType } from '../../../types/room';
import { Map, MarkerClusterer, CustomOverlayMap } from "react-kakao-maps-sdk";

import { makeMoneyString } from '../../../lib/utils';


const Container = styled.div`
    width: 100%;
    height: 100%;
    .room-map-price-overlay {
        padding: 0 10px;
        height: 30px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        box-shadow: 1px 3px 5px rgba(0,0,0,0.5);
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s;
        &:hover, &.active {
            transform: scale(1.1);
            background-color:  black;
            color: white;
        }
    }
`;

interface IProps {
    rooms: StoredRoomType[];
}

const RoomListMap: React.FC<IProps> = ({ rooms }) => {
    
    const router = useRouter();
    const { latitude, longitude } = router.query;

    const hoveredRoomId = useHoveredRoomStore((state) => state.hoveredRoomId);

    return (
        <Container>
            <Map
                center={{
                    lat: Number(latitude),
                    lng: Number(longitude)
                }}
                style={{ width: "100%", height: "100%" }}
                level={7}
            >
                <MarkerClusterer averageCenter={true}>
                    {rooms.map((room, index) => (
                        <div key={index}>
                            <CustomOverlayMap
                                position={{
                                    lat: Number(room.latitude),
                                    lng: Number(room.longitude)
                                }}
                                yAnchor={-0.3}
                            >
                                <Link href={`/room/${room.id}`}>
                                    <a 
                                        target='_blank'
                                        className={hoveredRoomId === room.id ? 'room-map-price-overlay active' : 'room-map-price-overlay'}
                                    >
                                        ￦{makeMoneyString(String(room.price))}
                                    </a>
                                </Link>
                            </CustomOverlayMap>
                        </div>
                    ))}
                </MarkerClusterer>

            </Map>
        </Container>
    )
}

export default RoomListMap