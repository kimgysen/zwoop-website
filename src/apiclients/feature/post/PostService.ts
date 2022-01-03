import axios, {AxiosError} from "axios";
import ApiResult from "@apiclients/type/ApiResult";
import CreatePost from "@models/CreatePost";

const backendBaseUri = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const postApiEndpoint = process.env.NEXT_PUBLIC_API_V1_PRIVATE_POST_PREFIX;

const url = backendBaseUri! + postApiEndpoint!;

export const createPost: (post: CreatePost, jwt: string) => Promise<ApiResult> = (post, jwt) => {
    return axios.post(url, post, {
        headers: {
            Authorization: `Bearer ${ jwt }`
        }
    })
        .then(res => {
            if (res.status === 201) {
                console.log(res);
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