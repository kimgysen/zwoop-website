import {connectStomp, disconnectStomp, initPrivateChat, subscribeToPrivateChat} from "./StompService";
import {NextRouter} from "next/router";
import {Dispatch, SetStateAction} from "react";
import PrivateMessageReceiveDto from "./receive/PrivateMessageReceiveDto";
import {HEADER_CONNECT_TYPE, HEADER_POST_ID} from "./types/StompHeader";
import {ConnectTypeEnum, stringFromConnectTypeEnum} from "./types/ConnectType";

interface connectPrivateChatRoomProps {
    postId: string,
    jwt: string,
    partnerId: string,
    setMessages: Dispatch<SetStateAction<PrivateMessageReceiveDto[]>>,
    router: NextRouter,
    markInboxItemAsRead: (partnerId: string) => void
}

export const connectPrivateChat = ({
    postId, jwt, partnerId, setMessages, router, markInboxItemAsRead
}: connectPrivateChatRoomProps) => {
    connectStomp(
        {
            [HEADER_CONNECT_TYPE]: stringFromConnectTypeEnum(ConnectTypeEnum.PRIVATE_CHAT),
            [HEADER_POST_ID]: postId
        }, jwt,
        (frame) => {
            console.log('connect private chat success', frame);

            if (partnerId) {
                initPrivateChat(postId, partnerId, (msg) => {
                    const privMessages = JSON.parse(msg.body);
                    setMessages(privMessages.reverse() as PrivateMessageReceiveDto[]);
                    markInboxItemAsRead(partnerId);
                });

                subscribeToPrivateChat(postId,(msg) => {
                    const privMsg = JSON.parse(msg.body);
                    console.log('Private message received, privMsg', JSON.parse(msg.body));
                    setMessages((messages: PrivateMessageReceiveDto[]) => [...messages, privMsg]);
                });
            }
        },
        (frame) => {
            console.log('error frame', frame);
            if (frame.headers.message.includes('ExpiredJwtException')) {
                // TODO: Add proper handling when jwt expired
                disconnectStomp();
                router.push('/login');
            }
        },
        (frame) => {
            console.log('disconnect');
        })
}
