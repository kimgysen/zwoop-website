import React, {FC, useEffect, useState} from "react";
import AuthState from "@models/auth/AuthState";
import BiddingViewHoc from "@components/pages/post/post-status/post-bidding/BiddingViewHoc";
import {getStompDispatcher} from "../../../../event_dispatchers/StompDispatcher";
import {
    POST_STATUS__ANSWER_ADDED,
    POST_STATUS__ANSWER_CHANGED,
    POST_STATUS__ANSWER_REMOVED,
    POST_STATUS__DEAL_CANCELLED,
    POST_STATUS__DEAL_INIT,
    POST_STEPPER__ANSWER_ACCEPTED
} from "../../../../event_dispatchers/config/StompEvents";
import DealInitViewHoc from "@components/pages/post/post-status/post-deal/deal-init/DealInitViewHoc";
import {getPostStatusFromPost, isAnswerAllowed} from "@components/pages/post/PostPageHelper";
import {PostStatusEnum} from "@models/enums/PostStatusEnum";
import AnswerCreateHoc from "@components/pages/post/post-status/post-answer/create/AnswerCreateHoc";
import AnswerView from "@components/pages/post/post-status/post-answer/view/AnswerView";
import AnswerDto from "@models/dto/domain-client-dto/answer/AnswerDto";
import PostDto from "@models/dto/domain-client-dto/post/PostDto";
import DealDto from "@models/dto/domain-client-dto/deal/DealDto";
import {isDealParticipant} from "../../../../util/DealUtil";
import {infoToast} from "@components/widgets/toast/AppToast";


interface BiddingViewHocProps {
    authState: AuthState,
    postDto: PostDto
}

const stompDispatcher = getStompDispatcher();

const PostStatusViewHoc: FC<BiddingViewHocProps> = ({ authState, postDto }) => {
    const [postStatus, setPostStatus] = useState<PostStatusEnum>(getPostStatusFromPost(postDto));
    const [dealDto, setDealDto] = useState<DealDto|null|undefined>(postDto?.postState?.deal);
    const [answerDto, setAnswerDto] = useState<AnswerDto|null|undefined>(postDto?.postState?.answer);
    const [isAnswerAccepted, setAnswerAccepted] = useState<boolean>(postDto?.postState?.postStatus?.status === PostStatusEnum.ANSWER_ACCEPTED.toString());


    useEffect(() => {
        setPostStatus(getPostStatusFromPost(postDto));
    }, [postDto?.postId, postDto?.postState?.postStatus])

    console.log(postStatus);
    useEffect(() => {
        if (authState?.principalId && postDto?.postId) {
            stompDispatcher.on(POST_STATUS__DEAL_INIT, (dealDto: DealDto) => {
                setDealDto(dealDto);
                setPostStatus(PostStatusEnum.DEAL_INIT);

                if (!isDealParticipant(authState, dealDto)) {
                    infoToast(`${ dealDto?.op?.nickName } made a deal with ${ dealDto?.consultant?.nickName }`);
                }

            });

            stompDispatcher.on(POST_STATUS__DEAL_CANCELLED, (dealDto: DealDto) => {
                setDealDto(null);
                setPostStatus(PostStatusEnum.POST_INIT);

                if (!isDealParticipant(authState, dealDto)) {
                    infoToast(`${ dealDto?.op?.nickName } cancelled deal with ${ dealDto?.consultant?.nickName } cancelled`);
                }
            });

            stompDispatcher.on(POST_STATUS__ANSWER_ADDED, (answerDto: AnswerDto) => {
                setAnswerDto(answerDto);
                setPostStatus(PostStatusEnum.ANSWERED);

                if (!isDealParticipant(authState, dealDto)) {
                    infoToast(`${ dealDto?.consultant?.nickName } added an answer.`);
                }
            });

            stompDispatcher.on(POST_STATUS__ANSWER_CHANGED, (answerDto: AnswerDto) => {
                setAnswerDto(answerDto);
            });

            stompDispatcher.on(POST_STATUS__ANSWER_REMOVED, () => {
                setAnswerDto(null);
                setPostStatus(PostStatusEnum.DEAL_INIT);

                if (!isDealParticipant(authState, dealDto)) {
                    infoToast(`${ dealDto?.consultant?.nickName } removed an answer.`);
                }
            });

            stompDispatcher.on(POST_STEPPER__ANSWER_ACCEPTED, () => {
                setAnswerAccepted(true);
            });

        }

        return function cleanUp() {
            stompDispatcher.remove(POST_STATUS__DEAL_INIT);
            stompDispatcher.remove(POST_STATUS__DEAL_CANCELLED);
            stompDispatcher.remove(POST_STATUS__ANSWER_ADDED);
            stompDispatcher.remove(POST_STATUS__ANSWER_CHANGED);
            stompDispatcher.remove(POST_STATUS__ANSWER_REMOVED);
        }

    }, [authState?.principalId, postDto?.postId]);

    return (
        <>
            {
                postStatus === PostStatusEnum.POST_INIT
                && <BiddingViewHoc
                    authState={ authState }
                    postDto={ postDto }
                />
            }
            {
                postStatus === PostStatusEnum.DEAL_INIT
                && !!dealDto
                && <DealInitViewHoc
                        authState={ authState }
                        postDto={ postDto }
                        dealDto={ dealDto }
                    />
            }
            {
                postStatus === PostStatusEnum.DEAL_INIT
                && isAnswerAllowed(authState, postStatus, dealDto)
                && <AnswerCreateHoc
                        authState={ authState }
                        postId={ postDto?.postId }
                        answerDto={ answerDto }
                    />
            }
            {
                postStatus === PostStatusEnum.ANSWERED
                    || postStatus === PostStatusEnum.ANSWER_ACCEPTED
                && answerDto
                && <AnswerView
                        authState={ authState }
                        postDto={ postDto }
                        answerDto={ answerDto }
                        isAnswerAccepted={ isAnswerAccepted }
                    />
            }
        </>
    )
}

export default PostStatusViewHoc;
