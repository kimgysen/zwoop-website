import {FC} from "react";
import PrivateMessageReceiveDto from "../../../../service/stomp/receive/private_chat/PrivateMessageReceiveDto";


interface ChatBoxProps {
    messages: PrivateMessageReceiveDto[]
}

const ChatBox: FC<ChatBoxProps> = ({ messages }) => {
    return (
        <>
            Chatbox
        </>
    )
}

export default ChatBox;
