import {getRawJwt} from "../../../service/jwt/JwtService";
import urlJoin from "url-join";
import axios, {AxiosError} from "axios";
import {handleAxiosError, handleAxiosResponse} from "@api_clients/util/ResponseUtil";
import ApiResult from "@api_clients/type/ApiResult";
import UserNotificationCountDto from "@models/dto/domain-client-dto/usernotification/UserNotificationCountDto";
import UserNotificationDto from "@models/dto/domain-client-dto/usernotification/UserNotificationDto";

const backendBaseUri = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const notificationApiPrivatePath = process.env.NEXT_PUBLIC_API_V1_PRIVATE_NOTIFICATION_PREFIX;

const notificationApiPrivateEndpoint = urlJoin(backendBaseUri!, notificationApiPrivatePath!);

export const getNotificationUnreadCount:
    () => Promise<ApiResult<UserNotificationCountDto>> =
    async () => {
        const url = urlJoin(notificationApiPrivateEndpoint, '/unread/count');
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
                successProp: res.data as UserNotificationCountDto
            }))
            .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const getNotifications:
    (page: number, size: number) => Promise<ApiResult<UserNotificationDto[]>> =
    async (page, size) => {
        const jwt = await getRawJwt();

        const params: any = {
            headers: {
                Authorization: `Bearer ${ jwt }`
            }, page, size };

        return axios
            .get(notificationApiPrivateEndpoint, params)
            .then(res => handleAxiosResponse({
                res,
                successStatus: 200,
                successProp: res.data.content
            }))
            .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const resetNotificationCount: () => Promise<ApiResult<boolean>> =
    async () => {
        const jwt = await getRawJwt();
        const url = urlJoin(notificationApiPrivateEndpoint, '/unread/reset');

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
