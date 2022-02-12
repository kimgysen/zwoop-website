import React, {FC} from "react";
import PublicMessageReceiveDto from "../../../../../../service/stomp/dto/receive/public_chat/PublicMessageReceiveDto";
import {Flex} from "@chakra-ui/layout/src/flex";
import {List} from "@chakra-ui/react";
import styles from "@components/pages/tag/chat/public_chat/PublicChatWidget.module.css";
import PublicMessageItem from "@components/pages/tag/chat/public_chat/chatbox/PublicMessageItem";

interface PublicMessageListProps {
    messages: PublicMessageReceiveDto[]
}

const PublicMessageList: FC<PublicMessageListProps> = ({ messages }) => {
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
                    messages.map((chatMessage, index) => (
                        <PublicMessageItem
                            key={`msg-${ index }`}
                            chatMessage={ chatMessage }
                        />
                    ))
                }
            </List>
        </Flex>    )

}

export default PublicMessageList;
