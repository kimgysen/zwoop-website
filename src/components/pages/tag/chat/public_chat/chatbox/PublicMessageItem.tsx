import React, {FC} from "react";
import PublicMessageReceiveDto from "@models/dto/stomp/receive/public_chat/PublicMessageReceiveDto";
import {Box, Image} from "@chakra-ui/react";
import styles from "@components/pages/tag/chat/public_chat/PublicChatWidget.module.css";
import dayjs from "dayjs";

interface PublicMessageItemProps {
    chatMessage: PublicMessageReceiveDto
}

const PublicMessageItem: FC<PublicMessageItemProps> = ({ chatMessage }) => {
    return (
        <Box className={ [styles['chatApp__convMessageItem--right']].join(' ') }
             alignItems='center'
             py='8px'
        >
            <Image
                src={ chatMessage.fromUserAvatar }
                alt={ chatMessage.fromUserId }
                className={ styles.chatApp__convMessageAvatar }
                w='30px'
                h='30px'
            />
            <Box className={ styles.chatApp__convMessageValue }>
                { chatMessage.message }
            </Box>
            <Box className={ styles.chatApp__messageDate }>
                { dayjs(chatMessage.date).format('HH:mm') }
            </Box>
        </Box>
    )
}

export default PublicMessageItem;
