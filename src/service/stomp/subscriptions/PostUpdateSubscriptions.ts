import {getStompClient} from "../StompService";
import {
    POST_UPDATE__BIDDING_ADDED,
    POST_UPDATE__BIDDING_CHANGED,
    POST_UPDATE__BIDDING_REMOVED,
    POST_UPDATE__DEAL_CANCELLED,
    POST_UPDATE__DEAL_INIT,
    POST_UPDATE__POST_CHANGED,
    POST_UPDATE__POST_REMOVED
} from "../../../event_dispatchers/config/StompEvents";
import PostUpdateDto from "@models/dto/stomp/receive/post/PostUpdateDto";
import {PostUpdateFeatureType} from "@models/dto/stomp/receive/post/PostUpdateFeatureType";
import PostChangedDto from "@models/dto/stomp/receive/post/feature/post/PostChangedDto";
import PostRemovedDto from "@models/dto/stomp/receive/post/feature/post/PostRemovedDto";
import BiddingAddedDto from "@models/dto/stomp/receive/post/feature/bidding/BiddingAddedDto";
import BiddingChangedDto from "@models/dto/stomp/receive/post/feature/bidding/BiddingChangedDto";
import BiddingRemovedDto from "@models/dto/stomp/receive/post/feature/bidding/BiddingRemovedDto";
import {dispatchCustomMessage} from "./SubscriptionUtil";
import DealInitDto from "@models/dto/stomp/receive/dealbox/DealInitDto";
import DealCancelledDto from "@models/dto/stomp/receive/dealbox/DealCancelledDto";


export const subscribeToPostUpdates = (postId: string) => {
    getStompClient()
        .subscribe(`/topic/${ postId }.post.updates`, (msg) => {
            const postUpdateFeatureDto = JSON.parse(msg.body) as PostUpdateDto<any>;

            switch (postUpdateFeatureDto.postUpdateType) {
                case PostUpdateFeatureType.POST_CHANGED:
                    dispatchCustomMessage(POST_UPDATE__POST_CHANGED, postUpdateFeatureDto.dto as PostChangedDto);
                    break;

                case PostUpdateFeatureType.POST_REMOVED:
                    dispatchCustomMessage(POST_UPDATE__POST_REMOVED, postUpdateFeatureDto.dto as PostRemovedDto);
                    break;

                case PostUpdateFeatureType.BIDDING_ADDED:
                    dispatchCustomMessage(POST_UPDATE__BIDDING_ADDED, postUpdateFeatureDto.dto as BiddingAddedDto);
                    break;

                case PostUpdateFeatureType.BIDDING_CHANGED:
                    dispatchCustomMessage(POST_UPDATE__BIDDING_CHANGED, postUpdateFeatureDto.dto as BiddingChangedDto);
                    break;

                case PostUpdateFeatureType.BIDDING_REMOVED:
                    dispatchCustomMessage(POST_UPDATE__BIDDING_REMOVED, postUpdateFeatureDto.dto as BiddingRemovedDto);
                    break;

                case PostUpdateFeatureType.DEAL_INIT:
                    dispatchCustomMessage(POST_UPDATE__DEAL_INIT, postUpdateFeatureDto.dto as DealInitDto);
                    break;

                case PostUpdateFeatureType.DEAL_CANCELLED:
                    dispatchCustomMessage(POST_UPDATE__DEAL_CANCELLED, postUpdateFeatureDto.dto as DealCancelledDto);
                    break;

            }
        });
}
