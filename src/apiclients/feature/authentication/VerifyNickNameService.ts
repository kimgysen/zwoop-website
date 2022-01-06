import axios, {AxiosError} from "axios";
import ApiResult from "../../type/ApiResult";

const endpoint = process.env.NEXT_PUBLIC_API_USER_BASE_URI;
const prefix = process.env.NEXT_PUBLIC_API_V1_PUBLIC_USER_PREFIX;


export const verifyNickName: (nickName: string) => Promise<ApiResult> = (nickName: string) => {
    const url = endpoint! + prefix!;
    return axios
        .get(url, { params: { nickName }})
        .then(res => ({
            loading: false,
            success: { success: false },
            error: 'User already exists'
        }))
        .catch((reason: AxiosError) => {
            if (reason.response!.status === 404) {
                return {
                    loading: false,
                    success: { success: true, nickName },
                    error: null
                };
            } else {
                return {
                    loading: false,
                    success: { success: false },
                    error: 'Something went wrong at the server.'
                }
            }
        });

}
