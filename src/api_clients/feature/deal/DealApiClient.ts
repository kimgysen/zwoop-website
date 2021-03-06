import urlJoin from "url-join";
import axios, {AxiosError} from "axios";
import ApiResult from "@api_clients/type/ApiResult";
import {handleAxiosError, handleAxiosResponse} from "@api_clients/util/ResponseUtil";
import CreateDealDto from "@models/dto/rest/send/deal/CreateDealDto";
import {getRawJwt} from "../../../service/jwt/JwtService";
import DealDto from "@models/dto/domain-client-dto/deal/DealDto";


const backendBaseUri = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const dealApiPrivatePath = process.env.NEXT_PUBLIC_API_V1_PRIVATE_DEAL_PREFIX;
const dealApiPrivateEndpoint = urlJoin(backendBaseUri!, dealApiPrivatePath!);


export const createDealApi:
    (createDealDto: CreateDealDto) => Promise<ApiResult<DealDto>> =
    async (createDealDto) => {
        const jwt = await getRawJwt();
        return axios.post(dealApiPrivateEndpoint, createDealDto, {
            headers: {
                Authorization: `Bearer ${ jwt }`
            }
        })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 201,
            successProp: res.data as DealDto
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const cancelDealApi:
    (dealId: string) => Promise<ApiResult<DealDto>> =
    async (dealId) => {
        const jwt = await getRawJwt();
        const url = urlJoin(dealApiPrivateEndpoint, dealId);

        return axios
            .delete(url, {
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

export const getDealsForUserApi:
    () => Promise<ApiResult<DealDto[]>> =
    async () => {

        const jwt = await getRawJwt();

        const url = urlJoin(dealApiPrivateEndpoint, 'init');
        return axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${ jwt }`
                }
            })
            .then(res => handleAxiosResponse({
                res,
                successStatus: 200,
                successProp: res.data as DealDto[]
            }))
            .catch((reason: AxiosError) => handleAxiosError(reason));
    }
