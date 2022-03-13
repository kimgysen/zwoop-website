import React, {FC, useState} from "react";
import AuthState from "@models/auth/AuthState";
import AddBiddingView from "@components/pages/post/post-status/post-bidding/add-bidding/AddBiddingView";
import ApiResult from "@api_clients/type/ApiResult";
import {createBiddingApi} from "@api_clients/feature/bidding/BiddingApiClient";
import PostDto from "@models/dto/domain-client-dto/post/PostDto";
import BiddingDto from "@models/dto/domain-client-dto/bidding/BiddingDto";
import {dispatchCustomMessage} from "../../../../../../service/stomp/subscriptions/SubscriptionUtil";
import {POST_STATUS__BIDDING_ADDED} from "../../../../../../event_dispatchers/config/StompEvents";


interface AddBidViewHocProps {
    authState: AuthState,
    postDto: PostDto
}


const AddBiddingViewHoc: FC<AddBidViewHocProps> = ({ authState, postDto }) => {
    const [saveRes, setSaveRes] = useState<ApiResult<BiddingDto>>();

    const onSaveBidding = async (askPrice: string, currencyCode: string) => {
        const res = await createBiddingApi({
            postId: postDto?.postId,
            askPrice,
            currencyCode
        })
        setSaveRes(res);

        if (res?.success) {
            dispatchCustomMessage(POST_STATUS__BIDDING_ADDED, res?.success as BiddingDto);
        }
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
