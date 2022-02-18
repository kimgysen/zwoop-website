import ApiResult from "@api_clients/type/ApiResult";
import DealOpenedDto from "../../service/stomp/dto/receive/notification/feature/deal/DealOpenedDto";
import urlJoin from "url-join";
import axios, {AxiosError} from "axios";
import {handleAxiosError, handleAxiosResponse} from "@api_clients/util/ResponseUtil";
import {getRawJwt} from "../../service/jwt/JwtService";

const backendBaseUri = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const dealApiPrivateEndpoint = process.env.NEXT_PUBLIC_API_V1_PRIVATE_DEAL_PREFIX;


export const getOpenDeals: () => Promise<ApiResult<DealOpenedDto[]>> = async () => {
    const url = urlJoin(backendBaseUri!, dealApiPrivateEndpoint!, '/open');
    const jwt = await getRawJwt();

    return axios
        .get(url, {
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