import PublicMessageSendDto from "../dto/send/PublicMessageSendDto";
import {getStompClient} from "../StompService";

export const sendPublicMessage = (publicMessage: PublicMessageSendDto) => {
    getStompClient()
        .publish({
            destination: "/app/send.message.chatroom",
            body: JSON.stringify(publicMessage)
        });

}
