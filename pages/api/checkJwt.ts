import type {NextApiRequest, NextApiResponse} from "next";
import User from "../../src/model/User";

const jwt = require('jsonwebtoken');

const cookieName: string | undefined = process.env.JWT_COOKIE_NAME;
const secret: string | undefined = process.env.JWT_SECRET;


const HTTP_STATUS_UNAUTHORIZED = 401;

export default function handler (req: NextApiRequest, res: NextApiResponse) {
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

        jwt.verify(token as string, secret as string, (err: any, user: User) => {
            if (err)
                return res
                    .status(HTTP_STATUS_UNAUTHORIZED)
                    .json({ message: 'Jwt not successfully verified.' });

            else
                return res.json(user);

        });
    }
};
