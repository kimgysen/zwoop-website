import axios, {AxiosResponse} from "axios";

const backendApiEndpoint = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const tagApiPrefix = process.env.NEXT_PUBLIC_API_V1_PUBLIC_TAG_PREFIX;


export const findTagsStartingWith: (tagName: string) => Promise<AxiosResponse> = (tagName) => {
    const url = backendApiEndpoint! + tagApiPrefix!;

    return axios
        .get(url, { params: { tagName } });
}
