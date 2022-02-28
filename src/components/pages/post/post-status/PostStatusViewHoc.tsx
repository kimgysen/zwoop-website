import React, {FC, useEffect, useState} from "react";
import AuthState from "@models/auth/AuthState";
import Post from "@models/db/entity/Post";
import useBidding from "../../../../service/swr/bidding/UseBidding";
import BiddingView from "@components/pages/post/post-status/post-bidding/BiddingView";
import {getStompDispatcher} from "../../../../event_dispatchers/StompDispatcher";
import {
    POST_STATUS__BIDDING_ADDED,
    POST_STATUS__BIDDING_CHANGED,
    POST_STATUS__BIDDING_REMOVED,
    POST_STATUS__DEAL_CANCELLED,
    POST_STATUS__DEAL_INIT
} from "../../../../event_dispatchers/config/StompEvents";
import BiddingChangedDto from "@models/dto/stomp/receive/post/feature/bidding/BiddingChangedDto";
import BiddingRemovedDto from "@models/dto/stomp/receive/post/feature/bidding/BiddingRemovedDto";
import {infoToast} from "@components/widgets/toast/AppToast";
import DealInitViewHoc from "@components/pages/post/post-status/post-deal/deal-init/DealInitViewHoc";
import {getPostStatusFromPost, isAnswerAllowed} from "@components/pages/post/PostPageHelper";
import {PostStatusEnum} from "@models/db/entity/PostStatus";
import BiddingUpdateDto from "@models/dto/stomp/receive/post/feature/bidding/BiddingUpdateDto";
import Deal from "@models/db/entity/Deal";
import AnswerHoc from "@components/pages/post/post-status/post-answer/AnswerHoc";


interface BiddingViewHocProps {
    authState: AuthState,
    post: Post
}

const stompDispatcher = getStompDispatcher();

const PostStatusViewHoc: FC<BiddingViewHocProps> = ({ authState, post }) => {
    const { loading: biddingListLoading, data: biddingList, error: biddingListError, mutate } = useBidding(post?.postId);
    const [postStatus, setPostStatus] = useState<PostStatusEnum>(getPostStatusFromPost(post));
    const [deal, setDeal] = useState<Deal|null|undefined>(post?.postState?.deal);

    useEffect(() => {
        setPostStatus(getPostStatusFromPost(post));
    }, [post?.postId, post?.postState?.postStatus])

    useEffect(() => {
        if (post?.postId) {
            stompDispatcher.on(POST_STATUS__BIDDING_ADDED, (biddingDto: BiddingUpdateDto) => {
                mutate();
                infoToast(`Bidding submitted by ${ biddingDto?.consultant?.nickName }`);
            });

            stompDispatcher.on(POST_STATUS__BIDDING_CHANGED, (changedBiddingDto: BiddingChangedDto) => {
                mutate();
                infoToast(`Bidding updated by ${ changedBiddingDto?.consultant?.nickName }`);
            });

            stompDispatcher.on(POST_STATUS__BIDDING_REMOVED, (removedBiddingDto: BiddingRemovedDto) => {
                mutate();
                infoToast(`Bidding deleted by ${ removedBiddingDto?.consultant?.nickName }`);
            });

            stompDispatcher.on(POST_STATUS__DEAL_INIT, (dealDto: Deal) => {
                setDeal(dealDto);
                setPostStatus(PostStatusEnum.DEAL_INIT);
            });

            stompDispatcher.on(POST_STATUS__DEAL_CANCELLED, () => {
                mutate();
                setDeal(null);
                setPostStatus(PostStatusEnum.POST_INIT);
            });
        }

        return function cleanUp() {
            stompDispatcher.remove(POST_STATUS__BIDDING_ADDED);
            stompDispatcher.remove(POST_STATUS__BIDDING_CHANGED);
            stompDispatcher.remove(POST_STATUS__BIDDING_REMOVED);
            stompDispatcher.remove(POST_STATUS__DEAL_INIT);
            stompDispatcher.remove(POST_STATUS__DEAL_CANCELLED);
        }

    }, [post?.postId, authState, mutate]);

    return (
        <>
            {
                postStatus === PostStatusEnum.DEAL_INIT
                && !!deal
                && (
                    <DealInitViewHoc
                        authState={ authState }
                        post={ post }
                        deal={ deal }
                    />
                )
            }
            {
                postStatus === PostStatusEnum.POST_INIT
                && biddingList
                && <BiddingView
                    authState={ authState }
                    post={ post }
                    loading={ biddingListLoading }
                    biddingList={ biddingList }
                    errorMsg={ biddingListError?.data }
                    mutate={ mutate }
                />
            }
            {
                postStatus === PostStatusEnum.DEAL_INIT
                && isAnswerAllowed(authState, postStatus, deal)
                && <AnswerHoc
                        authState={ authState }
                        post={ post }
                    />
            }

        </>
    )
}

export default PostStatusViewHoc;
