import React, {FC, useEffect, useState} from "react";
import AuthState from "@models/auth/AuthState";
import Post from "@models/db/entity/Post";
import useBidding from "../../../../service/swr/bidding/UseBidding";
import BiddingView from "@components/pages/post/post-status/post-bidding/BiddingView";
import {getStompDispatcher} from "../../../../event_dispatchers/StompDispatcher";
import {
    POST_STATUS__ANSWER_ADDED,
    POST_STATUS__ANSWER_CHANGED,
    POST_STATUS__ANSWER_REMOVED,
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
import AnswerCreateHoc from "@components/pages/post/post-status/post-answer/create/AnswerCreateHoc";
import Answer from "@models/db/entity/Answer";
import AnswerView from "@components/pages/post/post-status/post-answer/view/AnswerView";


interface BiddingViewHocProps {
    authState: AuthState,
    post: Post
}

const stompDispatcher = getStompDispatcher();

const PostStatusViewHoc: FC<BiddingViewHocProps> = ({ authState, post }) => {
    const { loading: biddingListLoading, data: biddingList, error: biddingListError, mutate: mutateBiddings } = useBidding(post?.postId);
    const [postStatus, setPostStatus] = useState<PostStatusEnum>(getPostStatusFromPost(post));
    const [deal, setDeal] = useState<Deal|null|undefined>(post?.postState?.deal);
    const [answer, setAnswer] = useState<Answer|null|undefined>(post?.postState?.answer);


    useEffect(() => {
        setPostStatus(getPostStatusFromPost(post));
    }, [post?.postId, post?.postState?.postStatus])

    useEffect(() => {
        if (post?.postId) {
            stompDispatcher.on(POST_STATUS__BIDDING_ADDED, (biddingDto: BiddingUpdateDto) => {
                mutateBiddings();
                infoToast(`Bidding submitted by ${ biddingDto?.consultant?.nickName }`);
            });

            stompDispatcher.on(POST_STATUS__BIDDING_CHANGED, (changedBiddingDto: BiddingChangedDto) => {
                mutateBiddings();
                infoToast(`Bidding updated by ${ changedBiddingDto?.consultant?.nickName }`);
            });

            stompDispatcher.on(POST_STATUS__BIDDING_REMOVED, (removedBiddingDto: BiddingRemovedDto) => {
                mutateBiddings();
                infoToast(`Bidding deleted by ${ removedBiddingDto?.consultant?.nickName }`);
            });

            stompDispatcher.on(POST_STATUS__DEAL_INIT, (dealDto: Deal) => {
                setDeal(dealDto);
                setPostStatus(PostStatusEnum.DEAL_INIT);
            });

            stompDispatcher.on(POST_STATUS__DEAL_CANCELLED, () => {
                mutateBiddings();
                setDeal(null);
                setPostStatus(PostStatusEnum.POST_INIT);
            });

            stompDispatcher.on(POST_STATUS__ANSWER_ADDED, (answer: Answer) => {
                setAnswer(answer);
                setPostStatus(PostStatusEnum.ANSWERED);
            });

            stompDispatcher.on(POST_STATUS__ANSWER_CHANGED, (answer: Answer) => {
                setAnswer(answer);
            });

            stompDispatcher.on(POST_STATUS__ANSWER_REMOVED, () => {
                setAnswer(null);
                setPostStatus(PostStatusEnum.DEAL_INIT);
            });
        }

        return function cleanUp() {
            stompDispatcher.remove(POST_STATUS__BIDDING_ADDED);
            stompDispatcher.remove(POST_STATUS__BIDDING_CHANGED);
            stompDispatcher.remove(POST_STATUS__BIDDING_REMOVED);
            stompDispatcher.remove(POST_STATUS__DEAL_INIT);
            stompDispatcher.remove(POST_STATUS__DEAL_CANCELLED);
            stompDispatcher.remove(POST_STATUS__ANSWER_ADDED);
            stompDispatcher.remove(POST_STATUS__ANSWER_CHANGED);
            stompDispatcher.remove(POST_STATUS__ANSWER_REMOVED);
        }

    }, [post?.postId, authState, mutateBiddings]);

    return (
        <>
            {
                postStatus === PostStatusEnum.POST_INIT
                && biddingList
                && <BiddingView
                    authState={ authState }
                    post={ post }
                    loading={ biddingListLoading }
                    biddingList={ biddingList }
                    errorMsg={ biddingListError?.data }
                    mutate={ mutateBiddings }
                />
            }
            {
                postStatus === PostStatusEnum.DEAL_INIT
                && !!deal
                && <DealInitViewHoc
                        authState={ authState }
                        post={ post }
                        deal={ deal }
                    />
            }
            {
                postStatus === PostStatusEnum.DEAL_INIT
                && isAnswerAllowed(authState, postStatus, deal)
                && <AnswerCreateHoc
                        authState={ authState }
                        postId={ post?.postId }
                        answer={ answer }
                    />
            }
            {
                postStatus === PostStatusEnum.ANSWERED
                && answer
                && <AnswerView
                        authState={ authState }
                        post={ post }
                        answer={ answer }
                    />
            }
        </>
    )
}

export default PostStatusViewHoc;
