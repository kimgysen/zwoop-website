import axios, {AxiosError} from "axios";
import urlJoin from "url-join";
import ApiResult from "../../type/ApiResult";
import {handleAxiosError, handleAxiosResponse} from "../../util/ResponseUtil";
import User from "@models/user/User";
import Tag from "@models/tag/Tag";

const userApiBaseUri = process.env.NEXT_PUBLIC_API_USER_BASE_URI;
const userApiPublicEndpoint = process.env.NEXT_PUBLIC_API_V1_PUBLIC_USER_PREFIX;
const userApiPrivateEndpoint = process.env.NEXT_PUBLIC_API_V1_PRIVATE_USER_PREFIX;


export const getUserById: (userId: string) => Promise<ApiResult<User>> = (userId) => {
    const url = urlJoin(userApiBaseUri!, userApiPublicEndpoint!, userId);

    return axios
        .get(url)
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const getFollowedTags: (userId: string) => Promise<ApiResult<Tag[]>> = (userId) => {
    const url = urlJoin(userApiBaseUri!, userApiPublicEndpoint!, userId, 'tags');

    return axios
        .get(url)
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const updateNickName: (userId: string, nickName: string, jwt: string) => Promise<ApiResult<User>> = (userId, nickName, jwt) => {
    const url = urlJoin(userApiBaseUri!, userApiPrivateEndpoint!, userId, 'nickname');

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
    const url = urlJoin(userApiBaseUri!, userApiPrivateEndpoint!, userId, 'about');

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