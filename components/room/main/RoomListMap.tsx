import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { StoredRoomType } from '../../../types/room';
import { Map, MapMarker, MarkerClusterer, CustomOverlayMap } from "react-kakao-maps-sdk";

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
        transition: transform 0.2s;
        &:hover {
            transform: scale(1.1);
        }
    }
`;

interface IProps {
    rooms: StoredRoomType[];
}

const RoomListMap: React.FC<IProps> = ({ rooms }) => {
    const router = useRouter();
    const { latitude, longitude } = router.query;

    console.log(rooms)

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
                            {/* <MapMarker
                                position={{
                                    lat: Number(room.latitude),
                                    lng: Number(room.longitude)
                                }}
                            /> */}
                            <CustomOverlayMap
                                position={{
                                    lat: Number(room.latitude),
                                    lng: Number(room.longitude)
                                }}
                                yAnchor={-0.3}
                            >
                                <div className='room-map-price-overlay'>￦{makeMoneyString(String(room.price))}</div>
                            </CustomOverlayMap>
                        </div>

                    ))}
                </MarkerClusterer>

            </Map>
        </Container>
    )
}

export default RoomListMap