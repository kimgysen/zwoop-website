import {connectStomp, disconnectStomp, initInbox, subscribeToPrivateChat} from "./StompService";
import {NextRouter} from "next/router";
import {HEADER_CONNECT_TYPE, HEADER_POST_ID} from "./types/StompHeader";
import {ConnectTypeEnum, stringFromConnectTypeEnum} from "./types/ConnectType";
import {getInitInboxDispatcher} from "../../event_dispatchers/inbox/post_inbox/InitPostInboxDispatcher";
import PrivateMessageReceiveDto from "./receive/PrivateMessageReceiveDto";
import {getPrivateMessageDispatcher} from "../../event_dispatchers/private_messages/PrivateMessageDispatcher";


interface ConnectInboxProps {
    postId: string,
    jwt: string,
    router: NextRouter
}

const initInboxItemsDispatcher = getInitInboxDispatcher();
const privateMessageDispatcher = getPrivateMessageDispatcher();


export const connectInbox = ({ postId, jwt, router }: ConnectInboxProps) => {
    connectStomp({
            [HEADER_CONNECT_TYPE]: stringFromConnectTypeEnum(ConnectTypeEnum.POST_INBOX),
            [HEADER_POST_ID]: postId
        }, jwt, (frame) => {
        console.log('connect inbox success', frame);
        initInbox((msg) => {
            const inboxItems = JSON.parse(msg.body);
            initInboxItemsDispatcher.dispatch(inboxItems);
        });

        subscribeToPrivateChat((msg) => {
            const message = JSON.parse(msg.body) as PrivateMessageReceiveDto;

            privateMessageDispatcher.dispatch(message);
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