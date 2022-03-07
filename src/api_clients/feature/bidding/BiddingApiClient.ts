import ApiResult from "@api_clients/type/ApiResult";
import axios, {AxiosError} from "axios";
import urlJoin from "url-join";
import {handleAxiosError, handleAxiosResponse} from "@api_clients/util/ResponseUtil";
import Bidding from "@models/db/entity/Bidding";
import CreateBiddingDto from "@models/dto/rest/send/bidding/CreateBiddingDto";
import UpdateBiddingDto from "@models/dto/rest/send/bidding/UpdateBiddingDto";
import {getRawJwt} from "../../../service/jwt/JwtService";
import BiddingDto from "@models/dto/rest/receive/bidding/BiddingDto";


const backendBaseUri = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const biddingApiPublicPath = process.env.NEXT_PUBLIC_API_V1_PUBLIC_BIDDING_PREFIX;
const biddingApiPrivatePath = process.env.NEXT_PUBLIC_API_V1_PRIVATE_BIDDING_PREFIX;
const biddingApiPublicEndpoint = urlJoin(backendBaseUri!, biddingApiPublicPath!);
const biddingApiPrivateEndpoint = urlJoin(backendBaseUri!, biddingApiPrivatePath!);

export const getBiddingsForPost: (url: string) => Promise<Bidding[]> = (url) => {
    return axios
        .get(url)
        .then(res => res.data);
}

export const getBiddingItemsApi:
    (postId: string) => Promise<ApiResult<BiddingDto[]>> =
    async (postId) => {
        const url = urlJoin(biddingApiPublicEndpoint, `?postId=${postId}`)
        return axios
            .get(url)
            .then(res => handleAxiosResponse({
                res,
                successStatus: 200,
                successProp: res.data as BiddingDto[]
            }))
            .catch((reason: AxiosError) => handleAxiosError(reason));
    }

export const createBiddingApi:
    (createBiddingDto: CreateBiddingDto) => Promise<ApiResult<BiddingDto>> =
    async (createBiddingDto) => {
        const jwt = await getRawJwt();
        return axios.post(biddingApiPrivateEndpoint, createBiddingDto, {
                headers: {
                    Authorization: `Bearer ${ jwt }`
                }
            })
            .then(res => handleAxiosResponse({
                res,
                successStatus: 201,
                successProp: res.data as BiddingDto
            }))
            .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const updateBiddingApi:
    (biddingId: string, updateBiddingDto: UpdateBiddingDto) => Promise<ApiResult<BiddingDto>> =
    async (biddingId: string, updateBiddingDto) => {
        const jwt = await getRawJwt();
        const url = urlJoin(biddingApiPrivateEndpoint!, biddingId);
        return axios.put(url, updateBiddingDto, {
                headers: {
                    Authorization: `Bearer ${ jwt }`
                }
            })
            .then(res => handleAxiosResponse({
                res,
                successStatus: 200,
                successProp: res.data as BiddingDto
            }))
            .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const deleteBiddingApi:
    (biddingId: string) => Promise<ApiResult<boolean>> =
    async (biddingId) => {
        const url = urlJoin(biddingApiPrivateEndpoint!, biddingId);

        const jwt = await getRawJwt();
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
