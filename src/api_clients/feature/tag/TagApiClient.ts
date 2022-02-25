import axios, {AxiosError, AxiosResponse} from "axios";
import ApiResult from "../../type/ApiResult";
import urlJoin from "url-join";
import {handleAxiosError, handleAxiosResponse} from "../../util/ResponseUtil";
import {getRawJwt} from "../../../service/jwt/JwtService";
import {IsWatchingTag} from "@models/dto/user/IsWatchingTag";


const backendApiEndpoint = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const publicTagApiPrefix = process.env.NEXT_PUBLIC_API_V1_PUBLIC_TAG_PREFIX;
const privateTagApiPrefix = process.env.NEXT_PUBLIC_API_V1_PRIVATE_TAG_PREFIX;

export const findTagsStartingWith: (tagName: string) => Promise<AxiosResponse> = (tagName) => {
    const url = urlJoin(backendApiEndpoint!, publicTagApiPrefix!);

    return axios
        .get(url, { params: { tagName } });
}

export const isWatching:
    (tag: string) => Promise<ApiResult<IsWatchingTag>> =
    async (tagName) => {
        const url = urlJoin(backendApiEndpoint!, privateTagApiPrefix!);
        const jwt = await getRawJwt();

        return axios.get(`${ url }/${tagName}/watching`, {
            headers: {
                Authorization: `Bearer ${ jwt }`
            }
        })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const watchTag:
    (tag: string) => Promise<ApiResult<IsWatchingTag>> =
    async (tagName) => {
        const url = urlJoin(backendApiEndpoint!, privateTagApiPrefix!);
        const jwt = await getRawJwt();

        return axios.put(`${ url }/${tagName}/watch`, {}, {
                headers: {
                    Authorization: `Bearer ${ jwt }`
                }
            })
            .then(res => handleAxiosResponse({
                res,
                successStatus: 200,
                successProp: res.data
            }))
            .catch((reason: AxiosError) => handleAxiosError(reason));
}


export const unwatchTag:
    (tag: string) => Promise<ApiResult<IsWatchingTag>> =
    async (tagName) => {
        const url = urlJoin(backendApiEndpoint!, privateTagApiPrefix!);
        const jwt = await getRawJwt();

        return axios.put(`${ url }/${ tagName }/unwatch`, {}, {
            headers: {
                Authorization: `Bearer ${ jwt }`
            }
        })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));
}