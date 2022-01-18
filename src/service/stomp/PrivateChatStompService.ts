import {
    connectStomp,
    disconnectStomp,
    initPartnerRead,
    initPrivateChat,
    subscribeToPartnerRead,
    subscribeToPrivateChat,
    subscribeToStartTyping,
    subscribeToStopTyping
} from "./StompService";
import PrivateMessageReceiveDto from "./receive/PrivateMessageReceiveDto";
import {HEADER_CONNECT_TYPE, HEADER_POST_ID} from "./types/StompHeader";
import {ConnectTypeEnum, stringFromConnectTypeEnum} from "./types/ConnectType";
import {getPrivateMessageDispatcher} from "../../event_dispatchers/private_messages/PrivateMessageDispatcher";
import {getInitPrivateMessagesDispatcher} from "../../event_dispatchers/private_messages/InitPrivateMessagesDispatcher";
import {getPartnerReadDispatcher} from "../../event_dispatchers/private_messages/PartnerReadDispatcher";
import PartnerReadDto from "./receive/PartnerReadDto";
import {getInitPartnerReadDispatcher} from "../../event_dispatchers/private_messages/InitPartnerReadDispatcher";
import TypingDto from "./receive/TypingDto";
import {getStartTypingDispatcher} from "../../event_dispatchers/private_messages/StartTypingDispatcher";
import {getStopTypingDispatcher} from "../../event_dispatchers/private_messages/StopTypingDispatcher";

interface connectPrivateChatRoomProps {
    jwt: string,
    postId: string,
    partnerId?: string,
    redirectToLogin: () => void
}

const initPrivateMessagesDispatcher = getInitPrivateMessagesDispatcher();
const privateMessageDispatcher = getPrivateMessageDispatcher();
const initPartnerReadDispatcher = getInitPartnerReadDispatcher();
const partnerReadDispatcher = getPartnerReadDispatcher();
const startTypingDispatcher = getStartTypingDispatcher();
const stopTypingDispatcher = getStopTypingDispatcher();

export const connectPrivateChat = ({
    postId, jwt, partnerId, redirectToLogin }: connectPrivateChatRoomProps) => {
    connectStomp(
        {
            [HEADER_CONNECT_TYPE]: stringFromConnectTypeEnum(ConnectTypeEnum.PRIVATE_CHAT),
            [HEADER_POST_ID]: postId
        }, jwt,
        (frame) => {
            console.log('connect private chat success', frame);

            if (partnerId) {
                initPrivateChat(partnerId, (msg) => {
                    const messages = JSON.parse(msg.body) as PrivateMessageReceiveDto[];
                    initPrivateMessagesDispatcher.dispatch(messages);
                });

                initPartnerRead(partnerId, (msg) => {
                    const partnerHasRead = JSON.parse(msg.body) as boolean;
                    initPartnerReadDispatcher.dispatch(partnerHasRead);
                });
            }

            subscribeToPrivateChat((msg) => {
                const message = JSON.parse(msg.body) as PrivateMessageReceiveDto;
                privateMessageDispatcher.dispatch(message);
            });

            subscribeToPartnerRead((msg) => {
                const message = JSON.parse(msg.body) as PartnerReadDto;
                partnerReadDispatcher.dispatch(message);
            });

            subscribeToStartTyping((msg) => {
                const message = JSON.parse(msg.body) as TypingDto;
                startTypingDispatcher.dispatch(message);
            });

            subscribeToStopTyping((msg) => {
                const message = JSON.parse(msg.body) as TypingDto;
                stopTypingDispatcher.dispatch(message);
            });
        },
        (frame) => {
            console.log('error frame', frame);
            if (frame.headers.message.includes('ExpiredJwtException')) {
                // TODO: Add proper handling when jwt expired
                disconnectStomp();
                redirectToLogin();
            }
        },
        (frame) => {
            console.log('disconnect');
        })
}
