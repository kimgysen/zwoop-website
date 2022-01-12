import {FC} from "react";
import {Box} from "@chakra-ui/react";
import MessageItem from "@components/widgets/chat/post/chatwidget/subscomponents/MessageItem";
import styles from '../PostChatWidget.module.css';
import PrivateMessageReceiveDto from "../../../../../../service/stomp/receive/PrivateMessageReceiveDto";


interface MessageListProps {
    ownerId: string,
    messages: PrivateMessageReceiveDto[]
}

const MessageList: FC<MessageListProps> = ({ ownerId, messages }) => {
    return (
        <Box className={styles.chatApp__convTimeline}>
            {
                messages
                    && messages.length > 0
                    && messages.slice(0).reverse().map(
                        (messageItem: PrivateMessageReceiveDto, index) => (
                            <MessageItem
                                key={ `message-${index}` }
                                ownerId={ ownerId}
                                senderId={ messageItem.fromUserId }
                                senderAvatar={ messageItem.fromAvatar }
                                message={ messageItem.message }
                    />
                )
            )}
        </Box>
    )
}

export default MessageList;
