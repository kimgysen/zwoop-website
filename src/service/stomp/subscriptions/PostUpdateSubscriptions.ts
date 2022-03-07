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


export const subscribeToPostUpdates = (postId: string) => {
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
                    dispatchCustomMessage(POST_STATUS__BIDDING_ADDED, postUpdateFeatureDto.dto as BiddingDto);
                    break;

                case PostUpdateFeatureType.BIDDING_CHANGED:
                    dispatchCustomMessage(POST_STATUS__BIDDING_CHANGED, postUpdateFeatureDto.dto as BiddingDto);
                    break;

                case PostUpdateFeatureType.BIDDING_REMOVED:
                    dispatchCustomMessage(POST_STATUS__BIDDING_REMOVED, postUpdateFeatureDto.dto as BiddingDto);
                    break;

                case PostUpdateFeatureType.DEAL_INIT:
                    dispatchCustomMessage(POST_VIEW__DEAL_INIT, postUpdateFeatureDto.dto as DealDto);
                    dispatchCustomMessage(POST_STATUS__DEAL_INIT, postUpdateFeatureDto.dto as DealDto);
                    dispatchCustomMessage(POST_STEPPER__DEAL_INIT, postUpdateFeatureDto.dto as DealDto);
                    break;

                case PostUpdateFeatureType.DEAL_CANCELLED:
                    dispatchCustomMessage(POST_VIEW__DEAL_CANCELLED, postUpdateFeatureDto.dto as DealDto);
                    dispatchCustomMessage(POST_STATUS__DEAL_CANCELLED, postUpdateFeatureDto.dto as DealDto);
                    dispatchCustomMessage(POST_STEPPER__DEAL_CANCELLED, postUpdateFeatureDto.dto as DealDto);
                    break;

                case PostUpdateFeatureType.ANSWER_ADDED:
                    dispatchCustomMessage(POST_STATUS__ANSWER_ADDED, postUpdateFeatureDto.dto as AnswerDto);
                    dispatchCustomMessage(POST_STEPPER__ANSWER_ADDED, postUpdateFeatureDto.dto as AnswerDto);
                    break;

                case PostUpdateFeatureType.ANSWER_CHANGED:
                    dispatchCustomMessage(POST_STATUS__ANSWER_CHANGED, postUpdateFeatureDto.dto as AnswerDto);
                    break;

                case PostUpdateFeatureType.ANSWER_REMOVED:
                    dispatchCustomMessage(POST_STATUS__ANSWER_REMOVED, postUpdateFeatureDto.dto as AnswerDto);
                    dispatchCustomMessage(POST_STEPPER__ANSWER_REMOVED, postUpdateFeatureDto.dto as AnswerDto);
                    break;
            }
        });
}
