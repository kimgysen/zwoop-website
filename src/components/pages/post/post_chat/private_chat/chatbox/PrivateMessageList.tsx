import {FC} from "react";
import {Box} from "@chakra-ui/react";
import PrivateMessageItem from "@components/pages/post/post_chat/private_chat/chatbox/PrivateMessageItem";
import styles from '../PrivateChatWidget.module.css';
import PrivateMessageReceiveDto
    from "../../../../../../models/dto/stomp/receive/private_chat/feature/PrivateMessageReceiveDto";


interface MessageListProps {
    principalId: string,
    messages: PrivateMessageReceiveDto[]
}

const PrivateMessageList: FC<MessageListProps> = ({ principalId, messages }) => {
    return (
        <Box className={styles.chatApp__convTimeline}>
            {
                messages.map((messageItem: PrivateMessageReceiveDto, index) => (
                    <PrivateMessageItem
                        key={ `message-${index}` }
                        principalId={ principalId }
                        senderId={ messageItem.fromUserId }
                        senderAvatar={ messageItem.fromAvatar }
                        message={ messageItem.message }
                    />
                ))
            }
        </Box>
    )
}

export default PrivateMessageList;
