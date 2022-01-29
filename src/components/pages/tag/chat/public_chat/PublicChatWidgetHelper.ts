import {sendPublicMessage} from "../../../../../service/stomp/StompService";

export const handleSendPublicMessage = (tagName: string, message: string) => {
    const SESS_CHATROOM_ID = `room-tag-${ tagName }`;

    sendPublicMessage({
        chatRoomId: SESS_CHATROOM_ID,
        message
    });
}

