/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";

import Data from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { id } = req.query;
        try {
            const rooms = Data.room.find(id as string);
            if (rooms) {
                return res.status(200).send(rooms)
            }
            return res.status(404).send('해당 숙소가 없습니다.')
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
    
    return res.status(405).end();
}