import PrivateMessageSendDto from "../../../models/dto/stomp/send/PrivateMessageSendDto";
import {getStompClient} from "../StompService";


export const sendPrivateMessage = (privateMessage: PrivateMessageSendDto) => {
    getStompClient()
        .publish({
            destination: '/app/send.message.private',
            body: JSON.stringify(privateMessage)
        });
}

export const sendStartTyping = (partnerId: string) => {
    if (partnerId) {
        getStompClient().publish({
            destination: `/app/start.typing/${ partnerId }`
        });
    }
}

export const sendStopTyping = (partnerId: string) => {
    if (partnerId) {
        getStompClient().publish({
            destination: `/app/stop.typing/${ partnerId }`
        });
    }
}

export const sendMarkInboxItemAsRead = (partnerId: string) => {
    getStompClient()
        .publish({
            destination: '/app/mark.as.read',
            body: JSON.stringify({ partnerId })
        });
}
