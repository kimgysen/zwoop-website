
import useSWR from "swr";
import { retryLogin as fetcher } from "../../service/tronweb/TronWebService";
import TronLinkAuth from "../../model/TronlinkAuth";

export default function useTronLink() {
    const { data, mutate, error } = useSWR("tronLink", fetcher, {
        errorRetryCount: 0
    });

    return {
        tronLinkLoading: !data && !error,
        tronLinkAuth: data as TronLinkAuth,
        mutateTronLink: mutate
    };

}
