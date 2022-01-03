import PrivateChatMessage from "@components/widgets/chat/private/model/PrivateChatMessage";
import {FC} from "react";


interface ChatBoxProps {
    messages: PrivateChatMessage[]
}

const ChatBox: FC<ChatBoxProps> = ({ messages }) => {
    return (
        <>
            Chatbox
        </>
    )
}

export default ChatBox;
