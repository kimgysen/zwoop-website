import {getStompClient} from "../StompService";
import {
    POST_STATUS__ANSWER_ADDED,
    POST_STATUS__ANSWER_CHANGED,
    POST_STATUS__ANSWER_REMOVED,
    POST_STATUS__BIDDING_ADDED,
    POST_STATUS__BIDDING_CHANGED,
    POST_STATUS__BIDDING_REMOVED,
    POST_STATUS__DEAL_CANCELLED,
    POST_STATUS__DEAL_INIT,
    POST_STEPPER__ANSWER_ADDED,
    POST_STEPPER__ANSWER_REMOVED,
    POST_STEPPER__DEAL_CANCELLED,
    POST_STEPPER__DEAL_INIT,
    POST_VIEW__DEAL_CANCELLED,
    POST_VIEW__DEAL_INIT,
    POST_VIEW__POST_CHANGED,
    POST_VIEW__POST_REMOVED,
} from "../../../event_dispatchers/config/StompEvents";
import PostUpdateDto from "@models/dto/stomp/receive/post-updates/PostUpdateDto";
import {PostUpdateFeatureType} from "@models/dto/stomp/receive/post-updates/PostUpdateFeatureType";
import {dispatchCustomMessage} from "./SubscriptionUtil";
import BiddingDto from "@models/dto/rest/receive/bidding/BiddingDto";
import DealDto from "@models/dto/rest/receive/deal/DealDto";
import AnswerDto from "@models/dto/rest/receive/answer/AnswerDto";
import PostDto from "@models/dto/rest/receive/post/PostDto";
import {isDealOp} from "../../../util/DealUtil";
import AuthState from "@models/auth/AuthState";
import {isAnswerOwner, isBiddingPostConsultant} from "../../../util/PostUtil";


export const subscribeToPostUpdates = (authState: AuthState, postId: string) => {
    getStompClient()
        .subscribe(`/topic/${ postId }.post.updates`, (msg) => {
            const postUpdateFeatureDto = JSON.parse(msg.body) as PostUpdateDto<any>;

            switch (postUpdateFeatureDto.postUpdateType) {
                case PostUpdateFeatureType.POST_CHANGED:
                    dispatchCustomMessage(POST_VIEW__POST_CHANGED, postUpdateFeatureDto.dto as PostDto);
                    break;

                case PostUpdateFeatureType.POST_REMOVED:
                    dispatchCustomMessage(POST_VIEW__POST_REMOVED, postUpdateFeatureDto.dto as PostDto);
                    break;

                case PostUpdateFeatureType.BIDDING_ADDED:
                    const biddingAddedDto = postUpdateFeatureDto.dto as BiddingDto;
                    if (!isBiddingPostConsultant(authState, biddingAddedDto)) {
                        dispatchCustomMessage(POST_STATUS__BIDDING_ADDED, biddingAddedDto);
                    }
                    break;

                case PostUpdateFeatureType.BIDDING_CHANGED:
                    const biddingChangedDto = postUpdateFeatureDto.dto as BiddingDto;
                    if (!isBiddingPostConsultant(authState, biddingChangedDto)) {
                        dispatchCustomMessage(POST_STATUS__BIDDING_CHANGED, postUpdateFeatureDto.dto as BiddingDto);
                    }
                    break;

                case PostUpdateFeatureType.BIDDING_REMOVED:
                    const biddingRemovedDto = postUpdateFeatureDto.dto as BiddingDto;
                    if (!isBiddingPostConsultant(authState, biddingRemovedDto)) {
                        dispatchCustomMessage(POST_STATUS__BIDDING_REMOVED, postUpdateFeatureDto.dto as BiddingDto);
                    }
                    break;

                case PostUpdateFeatureType.DEAL_INIT:
                    const dealInitDto = postUpdateFeatureDto.dto as DealDto;
                    if (!isDealOp(authState, dealInitDto)) {
                        dispatchCustomMessage(POST_VIEW__DEAL_INIT, dealInitDto);
                        dispatchCustomMessage(POST_STATUS__DEAL_INIT, dealInitDto);
                        dispatchCustomMessage(POST_STEPPER__DEAL_INIT, dealInitDto);
                    }
                    break;

                case PostUpdateFeatureType.DEAL_CANCELLED:
                    const dealCancelledDto = postUpdateFeatureDto.dto as DealDto;
                    if (!isDealOp(authState, dealCancelledDto)) {
                        dispatchCustomMessage(POST_VIEW__DEAL_CANCELLED, dealCancelledDto);
                        dispatchCustomMessage(POST_STATUS__DEAL_CANCELLED, dealCancelledDto);
                        dispatchCustomMessage(POST_STEPPER__DEAL_CANCELLED, dealCancelledDto);
                    }
                    break;

                case PostUpdateFeatureType.ANSWER_ADDED:
                    const answerAddedDto = postUpdateFeatureDto.dto as AnswerDto;
                    if (!isAnswerOwner(authState, answerAddedDto)) {
                        dispatchCustomMessage(POST_STATUS__ANSWER_ADDED, answerAddedDto);
                        dispatchCustomMessage(POST_STEPPER__ANSWER_ADDED, answerAddedDto);
                    }
                    break;

                case PostUpdateFeatureType.ANSWER_CHANGED:
                    const answerChangedDto = postUpdateFeatureDto.dto as AnswerDto
                    if (!isAnswerOwner(authState, answerChangedDto)) {
                        dispatchCustomMessage(POST_STATUS__ANSWER_CHANGED, answerChangedDto);
                    }
                    break;

                case PostUpdateFeatureType.ANSWER_REMOVED:
                    const answerRemovedDto = postUpdateFeatureDto.dto as AnswerDto;
                    if (!isAnswerOwner(authState, answerRemovedDto)) {
                        dispatchCustomMessage(POST_STATUS__ANSWER_REMOVED, postUpdateFeatureDto.dto as AnswerDto);
                        dispatchCustomMessage(POST_STEPPER__ANSWER_REMOVED, postUpdateFeatureDto.dto as AnswerDto);
                    }
                    break;
            }
        });
}
