/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
let jwt = require('jsonwebtoken');
import uuid from 'react-uuid';
import Data from "../../../lib/data";
import { StoredUserType, UserType } from "../../../types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email, name, password, birthday } = req.body;

        const userExis = Data.user.existEmail({ email });
        if (userExis) {
            res.status(409).send('이미 가입된 이메일 입니다.')
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const users = Data.user.getList();

        const newUser: StoredUserType = {
            id: uuid(),
            email,
            name,
            password: hashedPassword,
            birthday,
            image: '/static/image/user/default_user_profile_image.jpg'
        };

        Data.user.write([...users, newUser]);

        // const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET);

        // res.setHeader(
        //     "Set-Cookie",
        //     `access_token=${token}; path=/; expires=${new Date(Date.now() + 60 * 60 * 24 * 1000 * 3).toISOString()}; httponly`
        // ); //3일 만료


        const newUserWithoutPassword: UserType = newUser; // StoredUserType의 Password 속성을 Partial로 만듬

        return res.status(200).send(newUserWithoutPassword)
    }
    return res.status(405).end();
}