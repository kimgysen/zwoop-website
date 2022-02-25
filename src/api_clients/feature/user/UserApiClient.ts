import axios, {AxiosError} from "axios";
import urlJoin from "url-join";
import ApiResult from "../../type/ApiResult";
import {handleAxiosError, handleAxiosResponse} from "../../util/ResponseUtil";
import User from "@models/db/entity/User";
import Tag from "@models/db/entity/Tag";
import {getRawJwt} from "../../../service/jwt/JwtService";

const userApiBaseUri = process.env.NEXT_PUBLIC_API_USER_BASE_URI;
const userApiPublicPath = process.env.NEXT_PUBLIC_API_V1_PUBLIC_USER_PREFIX;
const userApiPrivatePath = process.env.NEXT_PUBLIC_API_V1_PRIVATE_USER_PREFIX;

const userApiPrivateEndpoint = urlJoin(userApiBaseUri!, userApiPrivatePath!);
const userApiPublicEndpoint = urlJoin(userApiBaseUri!, userApiPublicPath!);

export const getUserById:
    (userId: string) => Promise<ApiResult<User>> =
    (userId) => {
        const url = urlJoin(userApiPublicEndpoint, userId);

        return axios
            .get(url)
            .then(res => handleAxiosResponse({
                res,
                successStatus: 200,
                successProp: res.data
            }))
            .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const getFollowedTags:
    (userId: string) => Promise<ApiResult<Tag[]>> =
    (userId) => {
        const url = urlJoin(userApiPublicEndpoint!, userId, 'tags');

        return axios
            .get(url)
            .then(res => handleAxiosResponse({
                res,
                successStatus: 200,
                successProp: res.data
            }))
            .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const updateNickName:
    (userId: string, nickName: string) => Promise<ApiResult<User>> =
    async (userId, nickName) => {
        const url = urlJoin(userApiPrivateEndpoint, userId, 'nickname');
        const jwt = await getRawJwt();
        return axios.put(url, { nickName }, {
            headers: {
                Authorization: `Bearer ${ jwt }`
            }
        })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason, [
            { status: 404, message: 'User not found.' },
            { status: 409, message: 'Nickname already exists.' },
            { status: 403, message: 'Not allowed to update the nickname.' }
        ]
    ));
}

export const updateAbout: (userId: string, aboutText: string, jwt: string) => Promise<ApiResult<User>> = (userId, aboutText, jwt) => {
    const url = urlJoin(userApiPrivateEndpoint!, userId, 'about');

    return axios.put(url, { aboutText }, {
        headers: {
            Authorization: `Bearer ${ jwt }`
        }
    })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason, [
            { status: 404, message: 'User not found.' },
            { status: 403, message: 'Not allowed to update the user profile.' }
        ]
    ));
}