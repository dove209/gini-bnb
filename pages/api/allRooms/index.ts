/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next";
import { infiniteQueryAllRooms } from "../../../types/room";
import Data from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { pageParam, limit } = req.query;
        try {
            const roomsList = Data.room.getList();
            const totalCount = roomsList.length;
            
            // 개수 자르기
            const limitedRooms = roomsList.slice((Number(pageParam) - 1) * Number(limit), (Number(pageParam) * Number(limit)));

            const rooms: infiniteQueryAllRooms = {
                roomsList: limitedRooms,
                totalCount, //전체 데이터의 수 
                hasMore: Number(pageParam) * Number(limit) < totalCount ? true : false, // 끝을 알려주는 속성
                nextPage: Number(pageParam) + 1 , // 다음 번에 건너뛸 데이터의 수 offset의 누적합
            }
            return res.status(200).send(rooms);
        } catch (e) {
            console.log(e)
            return res.send(e);
        }
    }
    return res.end();
}