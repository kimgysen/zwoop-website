import axios, {AxiosError} from "axios";
import ApiResult from "../../type/ApiResult";
import {handleAxiosError, handleAxiosResponse} from "../../util/ResponseUtil";
import AuthUser from "@models/auth/AuthUser";
import User from "@models/dto/domain-client-dto/user/UserFullDto";
import urlJoin from 'url-join';


const userApiBaseUri = process.env.NEXT_PUBLIC_API_USER_BASE_URI;
const userApiPath = process.env.NEXT_PUBLIC_API_V1_PUBLIC_USER_PREFIX;
const authApiPath = process.env.NEXT_PUBLIC_API_V1_PUBLIC_AUTH_PREFIX;

const userApiEndpoint = urlJoin(userApiBaseUri!, userApiPath!);
const authApiEndpoint = urlJoin(userApiBaseUri!, authApiPath!);

export const findUserByProviderAndOauthId:
    (authProviderId: number, oauthId: string) => Promise<ApiResult<User>> =
    (authProviderId, oauthId) => {
        return axios
            .get(userApiEndpoint, { params: { authProviderId, oauthId } })
            .then(res => handleAxiosResponse({
                res,
                successStatus: 200,
                successProp: res.data
            })).catch((reason: AxiosError) =>
                handleAxiosError(reason, [{ status: 404, message: 'User not found' }]));
}

export const registerUser:
    (body: { authProviderId: number, authId: string, avatar: String, firstName: string, lastName: string, email: string }) =>
    Promise<ApiResult<AuthUser>> = ({ authProviderId, authId, avatar, firstName, lastName, email }) => {
        return axios
            .post(authApiEndpoint + '/register', {
                authProviderId,
                authId,
                firstName,
                lastName,
                avatar,
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

    return axios
        .post(authApiEndpoint + '/login', {
            authProviderId,
            authId
        })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data,
        })).catch((reason: AxiosError) => handleAxiosError(reason));
}