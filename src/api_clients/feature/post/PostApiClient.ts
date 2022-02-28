import axios, {AxiosError, AxiosResponse} from "axios";
import ApiResult from "../../type/ApiResult";
import CreatePostDto from "@models/dto/rest/send/post/CreatePostDto";
import Post from "@models/db/entity/Post";
import {handleAxiosError, handleAxiosResponse} from "../../util/ResponseUtil";
import urlJoin from "url-join";
import {PostStatusEnum} from "@models/db/entity/PostStatus";
import {getRawJwt} from "../../../service/jwt/JwtService";

const backendBaseUri = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const postApiPrivatePath = process.env.NEXT_PUBLIC_API_V1_PRIVATE_POST_PREFIX;
const postApiPublicPath = process.env.NEXT_PUBLIC_API_V1_PUBLIC_POST_PREFIX;

const postApiPrivateEndpoint = urlJoin(backendBaseUri!, postApiPrivatePath!);
const postApiPublicEndpoint = urlJoin(backendBaseUri!, postApiPublicPath!);


export enum FeedTypeEnum {
    FEED_ALL,
    FEED_BY_TAG
}

export const createPostApi:
    (post: CreatePostDto) => Promise<ApiResult<string>> =
    async (post) => {
        const jwt = await getRawJwt();

        return axios.post(postApiPrivateEndpoint, post, {
            headers: {
                Authorization: `Bearer ${ jwt }`
            }
        })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 201,
            successProp: res.headers.location
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const updatePostApi:
    (postId: string, post: CreatePostDto) => Promise<ApiResult<string>> =
    async (postId, post) => {
        const url = urlJoin(postApiPrivateEndpoint, postId);

        const jwt = await getRawJwt();
        return axios.put(url, post, {
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

export const getSsrPostById:
    (postId: string) => Promise<AxiosResponse<Post>> =
    (postId) => {
        const url = urlJoin(postApiPublicEndpoint, postId);
        return axios.get(url)
}

export const getCsrPostById: (postId: string) => Promise<ApiResult<Post>> = (postId) => {
    const url = urlJoin(postApiPublicEndpoint, postId);
    return axios.get(url)
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const getFeed:
    (feedType: FeedTypeEnum, postStatus: PostStatusEnum, page: number, size: number, tagName?: string) => Promise<ApiResult<Post[]>> =
    (feedType, postStatus, page, size, tagName) => {
    let params: any = {
        feedType: FeedTypeEnum[feedType],
        postStatus: PostStatusEnum[postStatus],
        page,
        size
    };

    if (feedType === FeedTypeEnum.FEED_BY_TAG) {
        params.tagName = tagName;
    }

    return axios
        .get(postApiPublicEndpoint, { params })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data.content
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));

}
