import type {NextApiRequest, NextApiResponse} from "next";
const TronWeb = require('tronweb');
const jwt = require('jsonwebtoken');


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const { transactionId, signature, publicAddressTrx } = req.body;

        const tronWeb = new TronWeb({
            fullHost: 'https://api.shasta.trongrid.io'
        });

        try {
            console.log(transactionId);
            console.log(signature);
            console.log(publicAddressTrx);
            await tronWeb.trx.verifyMessage(transactionId, signature, publicAddressTrx);
            return res
                .status(200)
                .json({ success: true });

        } catch(e) {
            console.log(e);
            return res
                .status(401)
                .json({ message: 'Tronlink signature is invalid.' });
        }

    }

}