import axios, {AxiosError, AxiosResponse} from "axios";
import ApiResult from "../../type/ApiResult";
import SavePost from "@models/post/SavePost";
import Post, {PostStatusEnum} from "@models/post/Post";
import {handleAxiosError, handleAxiosResponse} from "../../util/ResponseUtil";
import urlJoin from "url-join";

const backendBaseUri = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const postApiPrivateEndpoint = process.env.NEXT_PUBLIC_API_V1_PRIVATE_POST_PREFIX;
const postApiPublicEndpoint = process.env.NEXT_PUBLIC_API_V1_PUBLIC_POST_PREFIX;

export enum FeedTypeEnum {
    FEED_ALL,
    FEED_BY_TAG
}

export const createPost: (post: SavePost, jwt: string) => Promise<ApiResult<string>> = (post, jwt) => {
    const url = urlJoin(backendBaseUri!, postApiPrivateEndpoint!);

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

export const updatePost: (postId: string, post: SavePost, jwt: string) => Promise<ApiResult<string>> = (postId, post, jwt) => {
    const url = urlJoin(backendBaseUri!, postApiPrivateEndpoint!, postId);

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

export const getSsrPostById: (postId: string) => Promise<AxiosResponse<Post>> = (postId) => {
    const url = urlJoin(backendBaseUri!, postApiPublicEndpoint!, postId);
    return axios.get(url)
}

export const getCsrPostById: (postId: string) => Promise<ApiResult<Post>> = (postId) => {
    const url = urlJoin(backendBaseUri!, postApiPublicEndpoint!, postId);
    return axios.get(url)
        .then(res => handleAxiosResponse({
            res,
            successStatus: 200,
            successProp: res.data
        }))
        .catch((reason: AxiosError) => handleAxiosError(reason));
}

export const getFeed: (feedType: FeedTypeEnum, postStatus: PostStatusEnum, page: number, size: number, tagName?: string) => Promise<ApiResult<Post[]>> =
    (feedType, postStatus, page, size, tagName) => {
    const url = urlJoin(backendBaseUri!, postApiPublicEndpoint!);

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
