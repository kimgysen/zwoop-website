import axios, {AxiosError} from "axios";
import ApiResult from "@apiclients/type/ApiResult";

const userApiBaseUri = process.env.NEXT_PUBLIC_API_USER_BASE_URI;
const userApiPublicEndpoint = process.env.NEXT_PUBLIC_API_V1_PUBLIC_USER_PREFIX;


export const getUserById: (userId: string) => Promise<ApiResult> = (userId) => {
    const url = userApiBaseUri! + userApiPublicEndpoint!;

    return axios
        .get(`${ url }/${ userId }`)
        .then(res => {
            if (res.status === 200) {
                return {
                    loading: false,
                    result: res.data,
                    error: null
                }
            } else {
                // TODO: Abstract this
                return {
                    loading: false,
                    result: null,
                    error: res.data.message as string
                }
            }
        })
        .catch((reason: AxiosError) => {
            return {
                loading: false,
                result: null,
                error: reason.toString()
            }
        });
}

export const getFollowedTags: (userId: string) => Promise<ApiResult> = (userId) => {
    const url = userApiBaseUri! + userApiPublicEndpoint!;

    return axios
        .get(`${ url }/${ userId }/tags`)
        .then(res => {
            if (res.status === 200) {
                return {
                    loading: false,
                    result: res.data,
                    error: null
                }
            } else {
                // TODO: Abstract this
                return {
                    loading: false,
                    result: null,
                    error: res.data.message as string
                }
            }
        })
        .catch((reason: AxiosError) => {
            return {
                loading: false,
                result: null,
                error: reason.toString()
            }
        });
}