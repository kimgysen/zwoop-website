import axios, {AxiosError} from "axios";
import ApiResult from "@apiclients/type/ApiResult";
import {handleAxiosError, handleAxiosResponse} from "@apiclients/util/ResponseUtil";

const userApiBaseUri = process.env.NEXT_PUBLIC_API_USER_BASE_URI;
const userApiPublicEndpoint = process.env.NEXT_PUBLIC_API_V1_PUBLIC_USER_PREFIX;
const userApiPrivateEndpoint = process.env.NEXT_PUBLIC_API_V1_PRIVATE_USER_PREFIX;


export const getUserById: (userId: string) => Promise<ApiResult> = (userId) => {
    const url = userApiBaseUri! + userApiPublicEndpoint!;

    return axios
        .get(`${ url }/${ userId }`)
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const getFollowedTags: (userId: string) => Promise<ApiResult> = (userId) => {
    const url = userApiBaseUri! + userApiPublicEndpoint!;

    return axios
        .get(`${ url }/${ userId }/tags`)
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const updateNickName: (userId: string, nickName: string, jwt: string) => Promise<ApiResult> = (userId, nickName, jwt) => {
    const url = userApiBaseUri! + userApiPrivateEndpoint!;

    return axios.put(`${ url }/${userId}/nickname`, { nickName }, {
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

export const updateAbout: (userId: string, aboutText: string, jwt: string) => Promise<ApiResult> = (userId, aboutText, jwt) => {
    const url = userApiBaseUri! + userApiPrivateEndpoint!;

    return axios.put(`${ url }/${userId}/about`, { aboutText }, {
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