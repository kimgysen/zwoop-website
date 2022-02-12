import React, {FC, useEffect, useState} from "react";
import AuthState from "@models/user/AuthState";
import Post from "@models/post/Post";
import AddBiddingView from "@components/pages/post/post-bidding/add-bidding/AddBiddingView";
import ApiResult from "@api_clients/type/ApiResult";
import {createBidding} from "@components/pages/post/post-bidding/add-bidding/AddBiddingViewHelper";
import {KeyedMutator} from "swr";
import Bidding from "@models/post/bidding/Bidding";


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
        const res = await createBidding({
            postId: post?.postId,
            userId: authState.principalId as string,
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
