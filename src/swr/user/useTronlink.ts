import useSWR from "swr";
import {retryLogin as fetcher} from "../../service/tronweb/TronWebService";
import TronLinkAuth from "@models/TronlinkAuth";

export default function useTronLink() {
    const { data, mutate, error } = useSWR("tronLink", fetcher, {
        errorRetryCount: 0
    });

    return {
        isTronLinkLoading: !data && !error,
        tronLinkAuth: data as TronLinkAuth,
        mutateTronLink: mutate
    };

}
