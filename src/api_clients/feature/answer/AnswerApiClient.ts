import SaveAnswerDto from "@models/dto/rest/send/answer/SaveAnswerDto";
import ApiResult from "@api_clients/type/ApiResult";
import {getRawJwt} from "../../../service/jwt/JwtService";
import urlJoin from "url-join";
import axios, {AxiosError} from "axios";
import {handleAxiosError, handleAxiosResponse} from "@api_clients/util/ResponseUtil";
import AnswerDto from "@models/dto/rest/receive/answer/AnswerDto";

const backendBaseUri = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const answerApiPrivatePath = process.env.NEXT_PUBLIC_API_V1_PRIVATE_ANSWER_PREFIX;
const answerApiPrivateEndpoint = urlJoin(backendBaseUri!, answerApiPrivatePath!);


export const createAnswerApi:
    (saveAnswerDto: SaveAnswerDto) => Promise<ApiResult<AnswerDto>> =
    async (saveAnswerDto) => {
        const jwt = await getRawJwt();
        return axios
            .post(answerApiPrivateEndpoint, saveAnswerDto, {
                headers: {
                    Authorization: `Bearer ${ jwt }`
                }
            })
            .then(res => handleAxiosResponse({
                res,
                successStatus: 201,
                successProp: res.data as AnswerDto
            }))
            .catch((reason: AxiosError) => handleAxiosError(reason));
    }

export const updateAnswerApi:
    (answerId: string, saveDto: SaveAnswerDto) => Promise<ApiResult<AnswerDto>> =
    async (answerId, saveDto) => {
        const jwt = await getRawJwt();
        const url = urlJoin(answerApiPrivateEndpoint, answerId);

        return axios
            .put(url,saveDto, {
                headers: {
                    Authorization: `Bearer ${ jwt }`
                }
            })
            .then(res => handleAxiosResponse({
                res,
                successStatus: 200,
                successProp: res.data as AnswerDto
            }))
            .catch((reason: AxiosError) => handleAxiosError(reason));
    }

export const deleteAnswerApi:
    (answerId: string) => Promise<ApiResult<boolean>> =
    async (answerId) => {
        const jwt = await getRawJwt();
        const url = urlJoin(answerApiPrivateEndpoint, answerId);

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