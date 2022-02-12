import {getStompClient} from "../StompService";
import {dispatchCustomMessage, dispatchStompMessage} from "./SubscriptionUtil";
import {
    PRIVATE_CHAT__INIT_IS_READ_RECEIVED,
    PRIVATE_CHAT__INIT_IS_WRITING_RECEIVED,
    PRIVATE_CHAT__ON_INIT_MESSAGES_RECEIVED,
    PRIVATE_CHAT__ON_MESSAGE_RECEIVED,
    PRIVATE_CHAT__ON_READ_RECEIVED,
    PRIVATE_CHAT__ON_START_TYPING_RECEIVED,
    PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED
} from "../../../event_dispatchers/config/StompEvents";
import PrivateChatFeatureDto from "../dto/receive/private_chat/PrivateChatFeatureDto";
import {PrivateChatFeatureType} from "../dto/receive/private_chat/PrivateChatFeatureType";
import PartnerReadDto from "../dto/receive/private_chat/feature/PartnerReadDto";
import TypingDto from "../dto/receive/private_chat/feature/TypingDto";


export const initPrivateChat = (partnerId: string) => {
    getStompClient()
        .subscribe(`/app/old.private.messages/${ partnerId }`, (msg) => {
            dispatchStompMessage(PRIVATE_CHAT__ON_INIT_MESSAGES_RECEIVED, msg);
        });
}

export const initPartnerRead = (partnerId: string) => {
    getStompClient()
        .subscribe(`/app/old.private.messages/${ partnerId }/read`, (msg) => {
            dispatchStompMessage(PRIVATE_CHAT__INIT_IS_READ_RECEIVED, msg);
        });
}

export const initPartnerIsWriting = (partnerId: string) => {
    getStompClient()
        .subscribe(`/app/writing/partner/${partnerId}`, (msg) => {
            dispatchStompMessage(PRIVATE_CHAT__INIT_IS_WRITING_RECEIVED, msg);
        });
}

export const subscribeToPrivateChatUpdates = () => {
    getStompClient()
        .subscribe(`/user/exchange/amq.direct/private.chat.updates`, (msg) => {
            const dto = JSON.parse(msg.body) as PrivateChatFeatureDto<any>;
            switch (dto.featureType) {
                case PrivateChatFeatureType.PRIVATE_MESSAGE:
                    dispatchCustomMessage(PRIVATE_CHAT__ON_MESSAGE_RECEIVED, dto.featureDto);
                    break;

                case PrivateChatFeatureType.PARTNER_READ:
                    const partnerReadDto: PartnerReadDto = dto.featureDto;
                    dispatchCustomMessage(
                        PRIVATE_CHAT__ON_READ_RECEIVED + `__${partnerReadDto.postId}_${ partnerReadDto.partnerId }`,
                        dto.featureDto as PartnerReadDto
                    );
                    break;

                case PrivateChatFeatureType.START_TYPING:
                    const startTypingDto: TypingDto = dto.featureDto;
                    dispatchCustomMessage(
                        PRIVATE_CHAT__ON_START_TYPING_RECEIVED + `__${startTypingDto.postId}_${ startTypingDto.partnerId }`,
                        dto.featureDto as TypingDto
                    );
                    break;

                case PrivateChatFeatureType.STOP_TYPING:
                    const stopTypingDto: TypingDto = dto.featureDto;
                    dispatchCustomMessage(
                        PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED + `__${stopTypingDto.postId}_${ stopTypingDto.partnerId }`,
                        dto.featureDto as TypingDto
                    );
                    break;
            }

        });

};

