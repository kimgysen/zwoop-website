import axios, {AxiosError, AxiosResponse} from "axios";
import ApiResult from "../type/ApiResult";

const userApiEndpoint = process.env.NEXT_PUBLIC_API_USER_BASE_URI;
const userApiPrefix = process.env.NEXT_PUBLIC_API_V1_PUBLIC_USER_PREFIX;
const authApiPrefix = process.env.NEXT_PUBLIC_API_V1_PUBLIC_AUTH_PREFIX;


export const findUserByProviderAndOauthId: (authProviderId: number, oauthId: string) =>
        Promise<ApiResult> = (authProviderId, oauthId) => {
    const url = userApiEndpoint! + userApiPrefix!;

    return axios
        .get(url, { params: { authProviderId, oauthId } })
        .then(res => ({
            loading: false,
            result: res.data,
            error: null
        }))
        .catch((reason: AxiosError) => {
            console.log(reason);
            if (reason.response!.status === 404) {
                return {
                    loading: false,
                    result: null,
                    error: 'User not found'
                };
            } else {
                return {
                    loading: false,
                    result: null,
                    error: 'Something went wrong at the server.'
                }
            }
        });
}

export const registerUser: (body: { authProviderId: number, authId: string, profilePic: String, firstName: string, lastName: string, email: string }) =>
        Promise<ApiResult> = ({ authProviderId, authId, profilePic, firstName, lastName, email }) => {
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
        .then(res => ({
            loading: false,
            result: res.data,
            error: null
        }))
        .catch((reason: AxiosError) => {
            return {
                loading: false,
                result: null,
                error: 'Something went wrong at the server.'
            }
        });
}

export const loginUser: (body: { authProviderId: number, authId: string }) =>
        Promise<ApiResult> = ({ authProviderId, authId }) => {
    const url = userApiEndpoint! + authApiPrefix!;

    return axios
        .post(url + '/login', {
            authProviderId,
            authId
        })
        .then(res => ({
            loading: false,
            result: res.data,
            error: null
        }))
        .catch((reason: AxiosError) => {
            console.log(reason);
            return {
                loading: false,
                result: null,
                error: 'Something went wrong at the server.'
            }
        });
}