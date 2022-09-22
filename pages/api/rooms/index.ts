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
    return res.status(405).end();
}