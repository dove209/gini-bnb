/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next";
import uuid from 'react-uuid';
import { StoredRoomType } from "../../../types/room";
import Data from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const rooms = Data.room.getList();
            const newRoom: StoredRoomType = {
                id: uuid(),
                ...req.body,
                createAt: new Date(),
                updateAt: new Date()
            };

            Data.room.write([...rooms, newRoom]);
            return res.status(200).send(newRoom);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    } 
    if (req.method === 'GET') {
        const { checkInDate, checkOutDate, adultCount, childrenCount, latitude, longitude, limit, page = '1', } = req.query;
        try {
            const rooms = Data.room.getList();

            // 개수 자르기
            const limitedRooms = rooms.splice(0 + (Number(page) - 1) * Number(limit), Number(limit));

            // host 정보 넣기
            const roomsWithHost = await Promise.all(
                limitedRooms.map(async (room) => {
                    const host = Data.user.find({ id: room.hostId });
                    return { ...room, host }
                })
            );


            return res.status(200).send(roomsWithHost);
        } catch (e) {
            console.log(e)
            return res.send(e);
        }
    }
    return res.end();
}