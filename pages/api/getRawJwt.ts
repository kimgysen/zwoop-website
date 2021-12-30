import type {NextApiRequest, NextApiResponse} from "next";
import {getToken} from "next-auth/jwt";


const secret = process.env.SECRET;

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req, secret: secret! });
    res.setHeader('content-type', 'text/plain');
    res.send(JSON.stringify(token, null, 2))
}
