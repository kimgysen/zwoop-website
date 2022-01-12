import {
    connectStomp,
    disconnectStomp,
    initConnectedUsers,
    initPublicChat,
    subscribeToConnectedUsers,
    subscribeToPublicChat
} from "./StompService";
import {NextRouter} from "next/router";
import {Dispatch, SetStateAction} from "react";
import ChatRoomUserReceiveDto from "./receive/ChatRoomUserReceiveDto";
import PublicMessageReceiveDto from "./receive/PublicMessageReceiveDto";
import {HEADER_CHATROOM_ID, HEADER_CONNECT_TYPE} from "./types/StompHeader";
import {ConnectTypeEnum, stringFromConnectTypeEnum} from "./types/ConnectType";

interface connectPublicChatRoomProps {
    chatRoomId: string,
    jwt: string,
    setMessagesLoading: Dispatch<SetStateAction<boolean>>,
    setMessages: Dispatch<SetStateAction<PublicMessageReceiveDto[]>>,
    setConnectedUsers: Dispatch<SetStateAction<ChatRoomUserReceiveDto[]>>,
    router: NextRouter,
}

export const connectPublicChatRoom = ({
    chatRoomId, jwt, setMessages, setMessagesLoading, setConnectedUsers, router }: connectPublicChatRoomProps
) => {
    connectStomp(
        {
            [HEADER_CONNECT_TYPE]: stringFromConnectTypeEnum(ConnectTypeEnum.PUBLIC_CHAT),
            [HEADER_CHATROOM_ID]: chatRoomId
        }, jwt,
        (frame) => {
            console.log('Public chat connect success', frame);
            initPublicChat((msg) => {
                setMessagesLoading(false);
                const pubMessages = JSON.parse(msg.body);
                setMessages(pubMessages as PublicMessageReceiveDto[]);
            });
            subscribeToPublicChat(chatRoomId, (msg) => {
                const pubMsg = JSON.parse(msg.body);
                setMessages((messages: PublicMessageReceiveDto[]) => [pubMsg, ...messages]);
            });
            initConnectedUsers((msg) => {
                setConnectedUsers(JSON.parse(msg.body));
            });
            subscribeToConnectedUsers(chatRoomId, (msg) => {
                setConnectedUsers(JSON.parse(msg.body));
            });
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
