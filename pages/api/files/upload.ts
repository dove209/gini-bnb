/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    
}

