import {sendPublicMessage} from "../../../../../service/stomp/StompService";
import PublicMessageReceiveDto from "../../../../../service/stomp/receive/public_chat/PublicMessageReceiveDto";

export const handleSendPublicMessage = (tagName: string, message: string) => {
    const SESS_CHATROOM_ID = `room-tag-${ tagName }`;

    sendPublicMessage({
        chatRoomId: SESS_CHATROOM_ID,
        message
    });
}

export const isEmptyList = (messages: PublicMessageReceiveDto[]) =>
    messages.length === 0;
