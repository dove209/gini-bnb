import React from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
// import RoomDetailPhotos from './RoomDetailPhotos';
import BedIcon from '../../../public/static/svg/room/bed.svg';
import { useRoom } from '../../../hooks/reactQuery/useRooms';

// import RoomAmentityIcon from './RoomAmentityIcon';
// import RoomDetailReservation from './RoomDetailReservation';

const Container = styled.div`
    width: 1120px;
    margin: auto;
    padding-top: 26px;
    padding-bottom: 100px;
    .room-detail-title {
        font-size: 26px;
        font-weight: 800;
        margin-bottom: 15px;
    }

    .room-detail-location {
        font-size: 14px;
        font-weight: 600;
        text-decoration: underline;
        color: ${palette.gray_71};
        margin-bottom: 24px;
    }

    .room-detail-contents {
        display: flex;
        justify-content: space-between;
    }
    .room-detail-infos {
        width: 644px;
        .room-detail-room-type {
            font-size: 22px;
            font-weight: 800;
            margin-bottom: 8px;
        }
        .room-detail-space-counts {
            font-size: 14px;
        }
        .room-detail-divider {
            width: 100%;
            height: 1px;
            background-color: ${palette.gray_dd};
            margin: 32px 0;
        }
        .room-detail-description {
            white-space: break-space;
            word-break: keep-all;
        }
    }
    
    .room-detail-bed-type-label {
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 24px;
    }
    .room-detail-bed-type-list {
        display: flex;
        .room-detail-bedroom-card {
            padding: 26px 24px;
            width: 204px;
            margin-right: 16px;
            border: 1px solid ${palette.gray_dd};
            border-radius: 12px;
            svg {
                margin-bottom: 20px;
            }
            .room-detail-bed-card-number {
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 12px;
            }
        }
    }
    .room-detail-conveniences-label {
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 24px;
    }
    .room-detail-conveniences-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
            display: flex;
            align-items: center;
            width: 50%;
            margin-bottom: 16px;
            svg {
                margin-right: 16px;
            }
        }
    }
`;

interface IProps {
    roomId: string
}

const RoomDetail: React.FC<IProps> = ({ roomId }) => {
    const { data, isSuccess, isLoading } = useRoom(roomId);


    // const getTranslatedRoomType = () => {
    //     switch (room.roomType) {
    //         case 'entire':
    //             return '집 전체';
    //         case 'private':
    //             return '개인실'
    //         default:
    //             return ''
    //     }
    // };

    // const getBedTypesText = (
    //     beds: {
    //         type: any;
    //         count: number
    //     }[]
    // ) => {
    //     const bedTypesText = beds.map((bed) => `${bed.type} ${bed.count}개,`).join('').slice(0, -1);
    //     return bedTypesText;
    // }
    if (isSuccess) {
        const room = data?.data;
        return (
            <Container>
            <h1 className='room-detail-title'>{room.title}</h1>
            <p className='room-detail-location'>
                {/* {room.district} {room.city} {room.country} */}
            </p>
            {/* <RoomDetailPhotos /> */}
            <section className='room-detail-contents'>
                <div className='room-detail-infos'>
                    <p className='room-detail-room-type'>
                        {/* {room.host.lastname}님의 호스팅하는 {getTranslatedRoomType()} */}
                    </p>
                    <p className='room-detail-space-counts'>
                        {/* 인원 {room.maximumGuestCount}명 · 침실 {room.bedroomCount}개 · 침대 {room.bedCount}개 · 욕실 {room.bathroomCount}개 */}
                    </p>
                    <div className='room-detail-divider' />
                    <p className='room-detail-description'>
                        {/* {room.description} */}
                    </p>
                    <div className='room-detail-divider' />
                    {/* {!isEmpty(room.bedList) && (
                        <>
                            <p className='room-detail-bed-type-label'>
                                침대/침구 유형
                            </p>
                            <ul className='room-detail-bed-type-list'>
                                {room.bedList.map((bedroom) => (
                                    <li className='room-detail-bedroom-card' key={bedroom.id}>
                                        <BedIcon />
                                        <p className='room-detail-bed-card-number'>
                                            {bedroom.id}번 침실
                                        </p>
                                        <p>{getBedTypesText(bedroom.beds)}</p>
                                    </li>
                                ))}
                                {room.publicBedList.map((bedroom, index) => (
                                    <li className='room-detail-bedroom-card' key={index}>
                                        <BedIcon />
                                        <p className='room-detail-bed-card-number'>공용 공간</p>
                                        <p>{getBedTypesText([bedroom])}</p>
                                    </li>
                                ))}
                            </ul>
                            <div className='room-detail-divider' />
                        </>
                    )}
                    {!isEmpty(room.conveniences) && (
                        <>
                            <p className='room-detail-conveniences-label'>편의시설</p>
                            <ul className='room-detail-conveniences-list'>
                                {room.amentities.map((amentity, index) => (
                                    <li key={index}>
                                        <RoomAmentityIcon amentity={amentity} />
                                        {amentity}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )} */}
                </div>
                {/* <RoomDetailReservation /> */}
            </section>
        </Container>
        )
    }

    if (isLoading) {
        return <div>로딩중....</div>
    }
    return <></>;
}

export default RoomDetail
