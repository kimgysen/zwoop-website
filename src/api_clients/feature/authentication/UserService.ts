import axios, {AxiosError} from "axios";
import ApiResult from "../../type/ApiResult";
import {handleAxiosError, handleAxiosResponse} from "../../util/ResponseUtil";
import AuthUser from "@models/auth/AuthUser";
import User from "@models/user/User";

const userApiEndpoint = process.env.NEXT_PUBLIC_API_USER_BASE_URI;
const userApiPrefix = process.env.NEXT_PUBLIC_API_V1_PUBLIC_USER_PREFIX;
const authApiPrefix = process.env.NEXT_PUBLIC_API_V1_PUBLIC_AUTH_PREFIX;


export const findUserByProviderAndOauthId: (authProviderId: number, oauthId: string) =>
        Promise<ApiResult<User>> = (authProviderId, oauthId) => {
    const url = userApiEndpoint! + userApiPrefix!;

    return axios
        .get(url, { params: { authProviderId, oauthId } })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data
        })).catch((reason: AxiosError) =>
            handleAxiosError(reason, [{ status: 404, message: 'User not found' }]));
}

export const registerUser: (body: { authProviderId: number, authId: string, profilePic: String, firstName: string, lastName: string, email: string }) =>
        Promise<ApiResult<AuthUser>> = ({ authProviderId, authId, profilePic, firstName, lastName, email }) => {
    const url = userApiEndpoint! + authApiPrefix!;

    return axios
        .post(url + '/register', {
            authProviderId,
            authId,
            firstName,
            lastName,
            profilePic,
            email
        })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data
        })).catch((reason: AxiosError) => handleAxiosError(reason));
}

export const loginUser: (body: { authProviderId: number, authId: string }) =>
        Promise<ApiResult<AuthUser>> = ({ authProviderId, authId }) => {
    const url = userApiEndpoint! + authApiPrefix!;

    return axios
        .post(url + '/login', {
            authProviderId,
            authId
        })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data,
        })).catch((reason: AxiosError) => handleAxiosError(reason));
}