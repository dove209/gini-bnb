/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next";
import uuid from 'react-uuid';
import Data from '../../../lib/data';
import { StoredReservation } from "../../../types/reservation";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        //나의 숙소 에약 리스트 불러오기
        try {
            const { userId } = req.query;
            if (!userId) {
                return res.status(400).send('필수 값이 없습니다.')
            }
            const myReservations = Data.reservation.getMyList(userId as string);
            return res.status(200).send(myReservations);

        } catch (error) {
            console.log(error)
        }
    }
    if (req.method === 'POST') {
        // 숙소 에약 등록하기
        try {
            const { userId, roomId, title, checkInDate, checkOutDate, adultCount, childrenCount, infantsCount } = req.body;
            if (!userId || !roomId || !title || !checkInDate || !checkOutDate || adultCount === undefined || childrenCount === undefined || infantsCount === undefined) {
                return res.status(400).send('필수 값이 없습니다.')
            }
            const reservations = Data.reservation.getList();

            const newReservation: StoredReservation = {
                id: uuid(),
                ...req.body,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            Data.reservation.write([...reservations, newReservation]);

            return res.status(200).send(newReservation);

        } catch (error) {
            console.log(error)
        }
    }
    if (req.method === 'DELETE') {
        // 숙소 예약 취소하기
        try {
            const { roomId } = req.body;
            if (!roomId) {
                return res.status(400).send('필수 값이 없습니다.')
            }
            const reservations = Data.reservation.getList();

            const newReservation = reservations.filter((reservations) => reservations.roomId !== roomId);

            Data.reservation.write([...newReservation]);

            return res.status(200).send(true);

        } catch (error) {
            console.log(error)
        }
    }
    return res.status(405).end();
}


