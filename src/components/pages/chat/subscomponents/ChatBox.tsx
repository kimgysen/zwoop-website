import {FC} from "react";
import PrivateMessageReceiveDto
    from "../../../../models/dto/stomp/receive/private_chat/feature/PrivateMessageReceiveDto";


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
