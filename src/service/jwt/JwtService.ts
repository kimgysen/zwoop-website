
// This is an example of how to read a JSON Web Token from an API route

import axios from "axios";


const endpoint = process.env.NEXT_PUBLIC_API_RAW_JWT_ENDPOINT;


export const getRawJwt = () => {
    if (!endpoint)
        throw Error('Endpoint to get raw JWT not defined in env variables.');

    return axios
        .get(endpoint)
        .then(res => {
            if (res.data.accessToken) {
                return res.data.accessToken['accessToken']
            }
            res.data
        });

}
