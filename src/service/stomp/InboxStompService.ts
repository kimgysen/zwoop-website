import {
    connectStomp,
    disconnectStomp,
    initPostInbox,
    subscribeToPartnerRead,
    subscribeToPrivateChat,
    subscribeToStartTyping,
    subscribeToStopTyping
} from "./StompService";
import {NextRouter} from "next/router";
import {HEADER_CONNECT_TYPE, HEADER_POST_ID} from "./types/StompHeader";
import {ConnectTypeEnum, stringFromConnectTypeEnum} from "./types/ConnectType";
import {getInitPostInboxDispatcher} from "../../event_dispatchers/inbox/post_inbox/InitPostInboxDispatcher";
import PrivateMessageReceiveDto from "./receive/PrivateMessageReceiveDto";
import {getPrivateMessageDispatcher} from "../../event_dispatchers/private_messages/PrivateMessageDispatcher";
import {getStartTypingDispatcher} from "../../event_dispatchers/private_messages/StartTypingDispatcher";
import {getStopTypingDispatcher} from "../../event_dispatchers/private_messages/StopTypingDispatcher";
import PartnerReadDto from "./receive/PartnerReadDto";
import TypingDto from "./receive/TypingDto";
import {getPartnerReadDispatcher} from "../../event_dispatchers/private_messages/PartnerReadDispatcher";


interface ConnectInboxProps {
    postId: string,
    jwt: string,
    router: NextRouter
}

const initPostInboxItemsDispatcher = getInitPostInboxDispatcher();
const privateMessageDispatcher = getPrivateMessageDispatcher();
const partnerReadDispatcher = getPartnerReadDispatcher();
const startTypingDispatcher = getStartTypingDispatcher();
const stopTypingDispatcher = getStopTypingDispatcher();

export const connectInbox = ({ postId, jwt, router }: ConnectInboxProps) => {
    connectStomp({
            [HEADER_CONNECT_TYPE]: stringFromConnectTypeEnum(ConnectTypeEnum.POST_INBOX),
            [HEADER_POST_ID]: postId
        }, jwt, (frame) => {
        console.log('connect inbox success', frame);
        initPostInbox((msg) => {
            const inboxItems = JSON.parse(msg.body);
            initPostInboxItemsDispatcher.dispatch(inboxItems);
        });

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
        if (frame.headers.message.includes('ExpiredJwtException')) {
            // TODO: Add proper handling when jwt expired
            disconnectStomp();
            router.push('/login');
        }
    },
    (frame) => {
        console.log('disconnect');
    });
}