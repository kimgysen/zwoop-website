import axios, {AxiosError} from "axios";
import ApiResult from "@apiclients/type/ApiResult";
import CreatePost from "@models/CreatePost";
import {PostStatusEnum} from "@models/Post";
import {handleAxiosError, handleAxiosResponse} from "@apiclients/util/ResponseUtil";

const backendBaseUri = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const postApiPrivateEndpoint = process.env.NEXT_PUBLIC_API_V1_PRIVATE_POST_PREFIX;
const postApiPublicEndpoint = process.env.NEXT_PUBLIC_API_V1_PUBLIC_POST_PREFIX;

export enum FeedTypeEnum {
    FEED_ALL,
    FEED_BY_TAG
}

export const createPost: (post: CreatePost, jwt: string) => Promise<ApiResult> = (post, jwt) => {
    const url = backendBaseUri! + postApiPrivateEndpoint!;

    return axios.post(url, post, {
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

export const getPostById: (postId: string) => Promise<ApiResult> = (postId) => {
    const url = backendBaseUri! + postApiPublicEndpoint!;
    return axios
        .get(`${ url }/${ postId }`)
        .then(res => res.data);
}

export const getFeed: (feedType: FeedTypeEnum, postStatus: PostStatusEnum, tagName: string|null, page: number, size: number) => Promise<ApiResult> =
    (feedType, postStatus, tagName, page, size) => {
    const url = backendBaseUri! + postApiPublicEndpoint!;

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
        .get(url, { params })
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data.content
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));

}
