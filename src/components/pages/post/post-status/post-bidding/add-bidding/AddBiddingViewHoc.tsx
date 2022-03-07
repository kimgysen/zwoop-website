import React, {FC, useEffect, useState} from "react";
import AuthState from "@models/auth/AuthState";
import AddBiddingView from "@components/pages/post/post-status/post-bidding/add-bidding/AddBiddingView";
import ApiResult from "@api_clients/type/ApiResult";
import {createBiddingApi} from "@api_clients/feature/bidding/BiddingApiClient";
import PostDto from "@models/dto/rest/receive/post/PostDto";
import BiddingDto from "@models/dto/rest/receive/bidding/BiddingDto";


interface AddBidViewHocProps {
    authState: AuthState,
    postDto: PostDto
}


const AddBiddingViewHoc: FC<AddBidViewHocProps> = ({ authState, postDto }) => {
    const [saveRes, setSaveRes] = useState<ApiResult<BiddingDto>>();


    useEffect(() => {
        if (saveRes?.success) {
            // dispatchCustomMessage(POST_STEPPER__DEAL_INIT, postUpdateFeatureDto.dto as DealInitDto);
        }
    }, [saveRes]);

    const onSaveBidding = async (askPrice: string, currencyCode: string) => {
        const res = await createBiddingApi({
            postId: postDto?.postId,
            askPrice,
            currencyCode
        })
        setSaveRes(res);
    }

    return (
        <>
            <AddBiddingView
                postDto={ postDto }
                onSaveBidding={ onSaveBidding }
            />
        </>
    )
}

export default AddBiddingViewHoc;
