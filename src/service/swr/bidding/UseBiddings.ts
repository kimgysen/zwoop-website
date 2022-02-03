import useSWR from "swr";

import {getBiddingsForPost as fetcher} from "@api_clients/feature/bidding/BiddingService";

const backendBaseUri = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const postApiPublicEndpoint = process.env.NEXT_PUBLIC_API_V1_PUBLIC_POST_PREFIX;


export default function useBiddings(postId: string) {
    const url = `${ backendBaseUri! }${ postApiPublicEndpoint! }/${ postId }/bidding`;
    const { data, error } = useSWR(url, (postId) => fetcher(postId), {
        errorRetryCount: 0
    });

    const loading = !data && !error;

    return { loading, data, error }

}