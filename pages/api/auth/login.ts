/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
let jwt = require('jsonwebtoken');
import Data from "../../../lib/data";
import { UserType } from "../../../types/user";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;
            
            const user = Data.user.findUserByEmail(email);
            if (!user) {
                return res.status(404).send('해당 이메일의 유저가 없습니다.')
            }

            // 비밀번호 일치 여부
            const isPasswordMatched = bcrypt.compareSync(password, user.password)
            if (!isPasswordMatched) {
                return res.status(403).send('비밀번호가 일치 하지 않습니다.');
            }

            // const token = jwt.sign(String(user.id), process.env.JWT_SECRET);
            // res.setHeader(
            //     "Set-Cookie",
            //     `access_token=${token}; path=/; expires=${new Date(Date.now() + 60 * 60 * 24 * 1000 * 3).toISOString()}; httponly`
            // ); //3일 만료

            const userWithoutPassword: UserType = user;

            return res.status(200).send(userWithoutPassword)


        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    }
    return res.status(405).end();
}