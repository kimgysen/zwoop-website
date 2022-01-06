import axios, {AxiosError, AxiosResponse} from "axios";
import ApiResult from "@apiclients/type/ApiResult";
import {handleAxiosError, handleAxiosResponse} from "@apiclients/util/ResponseUtil";


const backendApiEndpoint = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const publicTagApiPrefix = process.env.NEXT_PUBLIC_API_V1_PUBLIC_TAG_PREFIX;
const privateTagApiPrefix = process.env.NEXT_PUBLIC_API_V1_PRIVATE_TAG_PREFIX;

export const findTagsStartingWith: (tagName: string) => Promise<AxiosResponse> = (tagName) => {
    const url = backendApiEndpoint! + publicTagApiPrefix!;

    return axios
        .get(url, { params: { tagName } });
}

export const watchTag:(tag: string, jwt: string) => Promise<ApiResult> = (tagName, jwt) => {
    const url = backendApiEndpoint! + privateTagApiPrefix!;
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


export const unwatchTag:(tag: string, jwt: string) => Promise<ApiResult> = (tagName, jwt) => {
    const url = backendApiEndpoint! + privateTagApiPrefix!;

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