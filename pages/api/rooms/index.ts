/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next";
import uuid from 'react-uuid';
import { StoredRoomType } from "../../../types/room";
import Data from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { adultCount, childrenCount, latitude, longitude, limit, page = '1', } = req.query;
        // 등록된 숙소 리스트 불러오기
        try {
            const rooms = Data.room.getList();
            
            // 필터링 하기
            const filteredRooms = rooms.filter((room) => {
                if (latitude && latitude !== '0' && longitude && longitude !== '0') {
                    if (
                        !(
                            Number(latitude) - 0.1 < room.latitude && room.latitude < Number(latitude) + 0.01 && 
                            Number(longitude) - 0.05 < room.longitude && room.longitude < Number(longitude) + 0.005
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
            const limitedRooms = filteredRooms.splice(0 + (Number(page) - 1) * Number(limit), Number(limit));

            return res.status(200).send(limitedRooms);
        } catch (e) {
            console.log(e)
            return res.status(500).send(e);
        }
    }

    if (req.method === 'POST') {
        // 숙소 등록 하기
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

    if (req.method === 'DELETE') {
        // 숙소 등록 취소하기
        try {
            const { roomId } = req.body;
            if (!roomId) {
                return res.status(400).send('필수 값이 없습니다.')
            }
            const rooms = Data.room.getList();
            const newRooms = rooms.filter((room) => room.id !== roomId);
            
            Data.room.write([...newRooms]);

            return res.status(200).send(true)

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }

    return res.end();
}