import React, {FC, useEffect, useState} from "react";
import AuthState from "@models/auth/AuthState";
import Post from "@models/db/entity/Post";
import AddBiddingView from "@components/pages/post/post-status/post-bidding/add-bidding/AddBiddingView";
import ApiResult from "@api_clients/type/ApiResult";
import {KeyedMutator} from "swr";
import Bidding from "@models/db/entity/Bidding";
import {createBiddingApi} from "@api_clients/feature/bidding/BiddingApiClient";


interface AddBidViewHocProps {
    authState: AuthState,
    post: Post,
    mutate: KeyedMutator<Bidding[]>
}


const AddBiddingViewHoc: FC<AddBidViewHocProps> = ({ authState, post, mutate }) => {
    const [saveRes, setSaveRes] = useState<ApiResult<boolean>>();


    useEffect(() => {
        if (saveRes?.success) {
            mutate();
        }
    }, [saveRes]);

    const onSaveBidding = async (askPrice: string, currencyCode: string) => {
        const res = await createBiddingApi({
            postId: post?.postId,
            askPrice,
            currencyCode
        })
        setSaveRes(res);
    }

    return (
        <>
            <AddBiddingView
                post={ post }
                onSaveBidding={ onSaveBidding }
            />
        </>
    )
}

export default AddBiddingViewHoc;
