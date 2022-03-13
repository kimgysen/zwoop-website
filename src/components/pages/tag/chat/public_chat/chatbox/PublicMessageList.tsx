import React, {FC} from "react";
import PublicMessageReceiveDto from "@models/dto/stomp/receive/public_chat/PublicMessageReceiveDto";
import {Box, Flex, List, ListItem} from "@chakra-ui/react";
import styles from "@components/pages/tag/chat/public_chat/PublicChatWidget.module.css";
import PublicMessageItem from "@components/pages/tag/chat/public_chat/chatbox/PublicMessageItem";
import dayjs from "dayjs";

interface PublicMessageListProps {
    messages: PublicMessageReceiveDto[]
}

const PublicMessageList: FC<PublicMessageListProps> = ({ messages }) => {
    console.log(messages);
    return (
        <Flex
            direction='column-reverse'
            maxHeight='70vh'
            textAlign='left'
            overflowY="scroll"
        >
            <List spacing={3}
                  className={styles.chatApp__convTimeline}
            >
                {
                    messages.map((chatMessage, index) => {
                        const nextDate = index !== messages.length - 1
                            ? messages[index + 1]?.date
                            : null;
                        const datePrevDate = dayjs(nextDate).format('DD/MM/YYYY');
                        const dateCurrentDate = dayjs(chatMessage?.date)?.format('DD/MM/YYYY');

                        return (
                            <ListItem key={`msg-${ index }`}>
                                {
                                    !nextDate || dateCurrentDate !== datePrevDate
                                    && <Box className={ styles.chatApp__daySeparator }>
                                            { dayjs(chatMessage?.date).format('ddd, MMM D, YYYY') }
                                       </Box>
                                }
                                <PublicMessageItem
                                    chatMessage={ chatMessage }
                                />
                            </ListItem>
                        )
                    })
                }
            </List>
        </Flex>
    )

}

export default PublicMessageList;
