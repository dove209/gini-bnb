/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next";
import Data from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const rooms = Data.room.getList();

            // 개수 자르기
            // const limitedRooms = rooms.splice(0 + (Number(page) - 1) * Number(limit), Number(limit));

            return res.status(200).send(rooms);
        } catch (e) {
            console.log(e)
            return res.send(e);
        }
    }
    return res.end();
}