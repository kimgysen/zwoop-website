import type {NextApiRequest, NextApiResponse} from "next";
import {decode} from "jwt-simple";

import User from "@models/user/User";


const cookieName: string = process.env.JWT_COOKIE_NAME as string;
const secret: string = process.env.JWT_SECRET as string;


const HTTP_STATUS_UNAUTHORIZED = 401;

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (!cookieName) {
        return res
            .status(HTTP_STATUS_UNAUTHORIZED)
            .json({ message: 'Cookie name is not set in env variables.' });

    } else {
        const token: string = req.cookies[cookieName];

        if (!token) {
            return res
                .status(HTTP_STATUS_UNAUTHORIZED)
                .json({ message: 'Authentication cookie is not set.' });
        }

        try{
            const user:User = await decode(token , secret);
            return res.json(user);

        } catch (e) {
            return res
                .status(HTTP_STATUS_UNAUTHORIZED)
                .json({ message: 'Jwt not successfully verified.' });
        }
    }
};
