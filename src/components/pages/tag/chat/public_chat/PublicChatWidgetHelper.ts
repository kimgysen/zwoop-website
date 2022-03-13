import PublicMessageReceiveDto from "@models/dto/stomp/receive/public_chat/PublicMessageReceiveDto";
import {sendPublicMessage} from "../../../../../service/stomp/publishers/PublicChatPublisher";

export const handleSendPublicMessage = (tagName: string, message: string) => {
    const SESS_CHATROOM_ID = `room-tag-${ tagName }`;

    sendPublicMessage({
        chatRoomId: SESS_CHATROOM_ID,
        message
    });
}

export const isEmptyList = (messages: PublicMessageReceiveDto[]) =>
    messages.length === 0;
