import React, {FC} from "react";
import {Box, Image} from "@chakra-ui/react";
import styles from '../PrivateChatWidget.module.css';
import dayjs from "dayjs";
import PrivateMessageReceiveDto from "@models/dto/stomp/receive/private_chat/feature/PrivateMessageReceiveDto";


interface MessageItemProps {
    principalId: string,
    messageDto: PrivateMessageReceiveDto
}

const PrivateMessageItem: FC<MessageItemProps> =
    ({ principalId, messageDto }) => {

        /* message position formatting - right if I'm the author */
    let messagePosition = principalId == messageDto?.fromUserId
        ? styles['chatApp__convMessageItem--right']
        : styles['chatApp__convMessageItem--left'];

    return (
        <Box className={`${ styles.chatApp__convMessageItem} ${messagePosition} clearfix` }>
            <Image
                src={ messageDto?.fromAvatar }
                alt={ messageDto?.fromUserId }
                className={ styles.chatApp__convMessageAvatar }
            />
            <Box className={ styles.chatApp__convMessageValue }
                 dangerouslySetInnerHTML={{ __html: messageDto?.message }}>
            </Box>
            <Box className={ styles.chatApp__messageDate }>
                { dayjs(messageDto?.date).format('HH:mm') }
            </Box>
        </Box>
    )
}

export default PrivateMessageItem;
