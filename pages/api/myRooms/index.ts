/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next";
import Data from '../../../lib/data';
import { StoredRoomType } from "../../../types/room";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        //나의 등록 숙소 리스트 불러오기
        try {
            const { userId } = req.query;
            if (!userId) {
                return res.status(400).send('필수 값이 없습니다.')
            }
            const myRooms = Data.room.getMyList(userId as string);
            return res.status(200).send(myRooms);
        } catch (error) {
            console.log(error)
            return res.status(500).send(error);
        }
    }
    return res.status(405).end();
}