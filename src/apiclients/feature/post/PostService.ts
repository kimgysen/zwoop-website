import axios, {AxiosError} from "axios";
import ApiResult from "@apiclients/type/ApiResult";
import CreatePost from "@models/CreatePost";
import {PostStatusEnum} from "@models/Post";

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
        .then(res => {
            if (res.status === 201) {
                return {
                    loading: false,
                    result: res.headers.location,
                    error: null
                }
            } else {
                return {
                    loading: false,
                    result: null,
                    error: res.data.message as string
                }
            }
        })
        .catch((reason: AxiosError) => {
            return {
                loading: false,
                result: null,
                error: reason.toString()
            }
        });
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
        .then(res => {
            if (res.status === 200) {
                return {
                    loading: false,
                    result: res.data.content,
                    error: null
                }
            } else {
                return {
                    loading: false,
                    result: null,
                    error: res.data.message as string
                }
            }

        })
        .catch((reason: AxiosError) => {
            return {
                loading: false,
                result: null,
                error: reason.toString()
            }
        });

}
