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
        const { adultCount, childrenCount, latitude, longitude, limit, page = '1', } = req.query;
        try {
            const rooms = Data.room.getList();

            // 필터링 하기
            const filteredRooms = rooms.filter((room) => {
                if (latitude && latitude !== '0' && longitude && longitude !== '0') {
                    if (
                        !(
                            Number(latitude) - 0.5 < room.latitude &&
                            room.latitude < Number(latitude) + 0.05 && 
                            Number(longitude) - 0.5 < room.longitude &&
                            room.longitude < Number(longitude) + 0.05
                        )
                    ) {
                        return false
                    }
                }

                if ( room.maximumGuestCount <  Number(adultCount as string) + (Number(childrenCount as string) * 0.5 || 0)) {
                    return false
                }
                return true;
            });

            // 개수 자르기
            const limitedRooms = rooms.splice(0 + (Number(page) - 1) * Number(limit), Number(limit));

            return res.status(200).send(limitedRooms);
        } catch (e) {
            console.log(e)
            return res.send(e);
        }
    }
    return res.end();
}