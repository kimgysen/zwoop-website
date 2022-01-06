import {
    connectStomp,
    disconnectStomp,
    initConnectedUsers,
    initPublicChat,
    subscribeToConnectedUsers,
    subscribeToPrivateChat,
    subscribeToPublicChat
} from "./StompService";
import {NextRouter} from "next/router";
import {Dispatch, SetStateAction} from "react";
import ChatUser from "@components/widgets/chat/public/model/ChatUser";
import PublicChatMessage from "@components/widgets/chat/public/model/PublicChatMessage";

interface connectChatRoomProps {
    chatRoomId: string,
    jwt: string,
    messages: PublicChatMessage[],
    setMessages: Dispatch<SetStateAction<PublicChatMessage[]>>,
    setConnectedUsers: Dispatch<SetStateAction<ChatUser[]>>,
    router: NextRouter,
}

export const connectChatRoom = ({ chatRoomId, jwt, messages, setMessages, setConnectedUsers, router }: connectChatRoomProps) => {
    connectStomp(
        chatRoomId, jwt,
        (frame) => {
            console.log('connect success', frame);
            initPublicChat((msg) => {
                const pubMessages = JSON.parse(msg.body);
                setMessages(pubMessages.reverse() as PublicChatMessage[]);
            });
            subscribeToPublicChat(chatRoomId, (msg) => {
                const pubMsg = JSON.parse(msg.body);
                setMessages((messages: PublicChatMessage[]) => [...messages, pubMsg]);
            });
            subscribeToPrivateChat((privMsg) => {
                console.log('Private message received, privMsg');
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
