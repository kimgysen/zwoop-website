import React, {FC} from "react";
import PublicMessageReceiveDto from "../../../../../../service/stomp/dto/receive/public_chat/PublicMessageReceiveDto";
import {Box, Image, ListItem} from "@chakra-ui/react";
import styles from "@components/pages/tag/chat/public_chat/PublicChatWidget.module.css";
import dayjs from "dayjs";

interface PublicMessageItemProps {
    chatMessage: PublicMessageReceiveDto
}

const PublicMessageItem: FC<PublicMessageItemProps> = ({ chatMessage }) => {
    return (
        <ListItem>
            <Box className={ [styles['chatApp__convMessageItem--right']].join(' ') }
                 alignItems='center'
                 py='8px'
            >
                <Box
                    color='grey.50'
                >
                    { dayjs(chatMessage.date).format('DD-MM-YYYY hh:mm') }
                </Box>
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
            </Box>
        </ListItem>
    )
}

export default PublicMessageItem;
