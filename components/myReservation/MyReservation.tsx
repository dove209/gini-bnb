import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { useGetMyReservation, useCancelReservation } from '../../hooks/reactQuery/useReservation';
import { makeDateFormat } from '../../lib/utils';
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
            width: 450px;
            height: 250px;
            padding: 20px;
            margin: 20px;
            border: 1px solid ${palette.gray_aa};
            box-shadow: 0px 0px 10px ${palette.gray_aa};
            border-radius: 10px;
            cursor: pointer;
            .createAt {
                color: ${palette.gray_aa};
            }
            .title {
                font-weight: bold;
                font-size: 1.4rem;
                margin-top: 20px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
            }
            .checkDate {
                margin-top: 20px;
                font-size: 1.2rem;
                font-weight: bold;
            }
            .guestCount { 
                margin-top: 20px;
                font-size: 1.1rem;
                font-weight: bold;
            }
            button {
                position: absolute;
                width: calc(100% - 40px);
                bottom: 20px;
                left: 20px;
            }
        }
    }

    .empty {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

interface IProps {
    userId?: string
}

const MyReservation: React.FC<IProps> = ({ userId }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data, isLoading, isSuccess } = useGetMyReservation(userId as string);
    const { mutate: cancelReservationMutate } = useCancelReservation();

    const onClickCard = (roomId: string) => {
        router.push(`/room/${roomId}`)
    }

    // ?????? ????????????
    const cancelReservation = (e: React.MouseEvent<HTMLButtonElement>, roomId: string) => {
        e.stopPropagation()
        cancelReservationMutate(roomId, {
            onSuccess: (data) => {
                if (data) {
                    alert('?????? ?????? ????????? ?????????????????????.');
                    queryClient.invalidateQueries(queryCache.myReservation(userId as string))
                }
            },
            onError: (error) => {
                alert('?????? ?????? ????????? ?????????????????????..');
                console.log(error);
            }
        })
    }


    if (isSuccess) {
        if (data.length !== 0) {
            return (
                <Container>
                    <h1>?????? ?????? ??????</h1>
                    <ul>
                        {data.map((room) => (
                            <li key={room.id} onClick={() => onClickCard(room.roomId)}>
                                <p className='createAt'>?????????: {makeDateFormat(room.updatedAt, false)}</p>
                                <h1 className='title'>{room.title}</h1>
                                <div className='checkDate'>
                                    <p>?????????: {makeDateFormat(room.checkInDate, false)} ~ {makeDateFormat(room.checkOutDate, false)}</p>
                                </div>
                                <div className="guestCount">
                                    ????????? : ?????? {room.adultCount}???, ????????? {room.childrenCount}???, ??????{room.infantsCount}???
                                </div>
                                <Button onClick={(e) => cancelReservation(e, room.roomId)}>?????? ?????? ??????</Button>
                            </li>
                        ))}
                    </ul>
                </Container>
            )
        } else {
            return (
                <Container>
                    <h1 className='empty'>????????? ????????? ????????????.</h1>
                </Container>
            )

        }

    }
    return <></>
}

export default MyReservation