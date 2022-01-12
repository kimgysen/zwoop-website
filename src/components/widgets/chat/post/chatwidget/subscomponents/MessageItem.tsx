import {FC} from "react";
import {Box, Image} from "@chakra-ui/react";
import styles from '../PostChatWidget.module.css';


interface MessageItemProps {
    ownerId: string,
    senderId: string,
    senderAvatar: string,
    message: string
}

const MessageItem: FC<MessageItemProps> =
    ({ ownerId, senderId, senderAvatar, message }) => {

    /* message position formatting - right if I'm the author */
    let messagePosition = ownerId == senderId
        ? styles['chatApp__convMessageItem--right']
        : styles['chatApp__convMessageItem--left'];

    return (
        <Box className={`${ styles.chatApp__convMessageItem} ${messagePosition} clearfix` }>
            <Image
                src={ senderAvatar }
                alt={ senderId }
                className={ styles.chatApp__convMessageAvatar }
            />
            <Box className={ styles.chatApp__convMessageValue }
                 dangerouslySetInnerHTML={{ __html: message }}>
            </Box>
        </Box>
    )
}

export default MessageItem;
