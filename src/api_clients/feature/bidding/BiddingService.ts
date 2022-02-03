import ApiResult from "@api_clients/type/ApiResult";
import axios, {AxiosError} from "axios";
import {handleAxiosError, handleAxiosResponse} from "@api_clients/util/ResponseUtil";
import Bidding from "@models/post/Bidding";


const backendBaseUri = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const postApiPrivateEndpoint = process.env.NEXT_PUBLIC_API_V1_PRIVATE_POST_PREFIX;


export const getBiddingsForPost: (url: string) => Promise<Bidding[]> = (url) => {
    return axios
        .get(url)
        .then(res => res.data);
}


export const saveBidding: (postId: string, userId: string, askPrice: string, jwt: string)
    => Promise<ApiResult<void>> = (postId, userId, askPrice, jwt) => {
    const url = `${ backendBaseUri! }/${ postApiPrivateEndpoint! }/${ postId }/bidding`;

    return axios.put(`${ url }/${ userId }`, { askPrice }, {
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