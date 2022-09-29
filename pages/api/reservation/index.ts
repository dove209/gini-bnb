/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next";
import uuid from 'react-uuid';
import Data from '../../../lib/data';
import { StoredReservation } from "../../../types/reservation";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // 숙소 등록하기
        try {
            const { userId, roomId, checkInDate, checkOutDate, adultCount, childrenCount, infantsCount } = req.body;
            if (!userId || !roomId || !checkInDate || !checkOutDate || adultCount === undefined || childrenCount === undefined || infantsCount === undefined) {
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
    return res.status(405).end();
}


