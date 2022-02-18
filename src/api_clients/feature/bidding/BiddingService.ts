import ApiResult from "@api_clients/type/ApiResult";
import axios, {AxiosError} from "axios";
import urlJoin from "url-join";
import {handleAxiosError, handleAxiosResponse} from "@api_clients/util/ResponseUtil";
import Bidding from "@models/post/bidding/Bidding";
import CreateBidding from "@models/post/bidding/CreateBidding";
import DeleteBidding from "@models/post/bidding/DeleteBidding";
import AcceptBidding from "@models/post/bidding/AcceptBidding";
import UnAcceptBidding from "@models/post/bidding/UnAcceptBidding";


const backendBaseUri = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const postApiPrivateEndpoint = process.env.NEXT_PUBLIC_API_V1_PRIVATE_POST_PREFIX;


export const getBiddingsForPost: (url: string) => Promise<Bidding[]> = (url) => {
    return axios
        .get(url)
        .then(res => res.data);
}


export const saveBiddingApi: (bidding: CreateBidding, jwt: string)
    => Promise<ApiResult<boolean>> = (bidding, jwt) => {
    const url = urlJoin(backendBaseUri!, postApiPrivateEndpoint!, bidding?.postId, 'bidding', 'respondent', bidding?.userId);

    return axios.put(url, {
            askPrice: bidding?.askPrice,
            currencyCode: bidding?.currencyCode
        },
        {
            headers: {
                Authorization: `Bearer ${ jwt }`
            }
        })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 204,
            successProp: true
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const deleteBiddingApi: (bidding: DeleteBidding, jwt: string)
    => Promise<ApiResult<boolean>> = (bidding, jwt) => {
    const url = urlJoin(backendBaseUri!, postApiPrivateEndpoint!, bidding?.postId, 'bidding', 'respondent', bidding?.userId);

    return axios.delete(url, {
            headers: {
                Authorization: `Bearer ${ jwt }`
            }
        })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 204,
            successProp: true
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const acceptBiddingApi: (acceptBidding: AcceptBidding, jwt: string)
    => Promise<ApiResult<boolean>> = (acceptBidding, jwt) => {
    const url = urlJoin(backendBaseUri!, postApiPrivateEndpoint!, acceptBidding?.postId, 'bidding', acceptBidding?.biddingId, 'accepted');

    return axios
        .put(url, {}, {
            headers: {
                Authorization: `Bearer ${ jwt }`
            }
        })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 204,
            successProp: true
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));

}

export const unAcceptBiddingApi: (unAcceptBidding: UnAcceptBidding, jwt: string)
    => Promise<ApiResult<boolean>> = (acceptBidding, jwt) => {
    const url = urlJoin(backendBaseUri!, postApiPrivateEndpoint!, acceptBidding?.postId, 'bidding');

    return axios
        .delete(`${ url }/${acceptBidding?.biddingId}/accepted`, {
            headers: {
                Authorization: `Bearer ${ jwt }`
            }
        })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 204,
            successProp: true
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));

}