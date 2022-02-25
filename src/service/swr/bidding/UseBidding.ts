import useSWR from "swr";
import urlJoin from "url-join";


import {getBiddingsForPost as fetcher} from "@api_clients/feature/bidding/BiddingApiClient";

const backendBaseUri = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URI;
const biddingApiPublicEndpoint = process.env.NEXT_PUBLIC_API_V1_PUBLIC_BIDDING_PREFIX;


export default function useBidding(postId: string) {
    const url = urlJoin(backendBaseUri!, biddingApiPublicEndpoint!, `?postId=${postId}`);
    const { data, mutate, error } = useSWR(url, (postId) => fetcher(postId), {
        errorRetryCount: 0
    });

    const loading = !data && !error;

    return { loading, data, error, mutate }

}