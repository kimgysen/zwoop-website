import React, {FC} from "react";
import {Box} from "@chakra-ui/layout/src/box";
import styles from './PostChatWidget.module.css';
import MessageList from "@components/widgets/chat/post/chatwidget/subscomponents/MessageList";
import InputMessage from "@components/widgets/chat/post/chatwidget/subscomponents/InputMessage";
import PrivateMessageReceiveDto from "../../../../../service/stomp/receive/PrivateMessageReceiveDto";
import {ChatPartner} from "../../../../../../pages/post/[postId]";


interface PostChatWidgetProps {
    ownerId: string,
    partner: ChatPartner,
    messages: PrivateMessageReceiveDto[],
    sendMessage: (partner: ChatPartner, message: string) => void,
    isLoading: boolean
}

const PostChatWidget: FC<PostChatWidgetProps> = ({ ownerId, partner, messages, sendMessage, isLoading }) => {
    return (
        <Box>
            <MessageList
                ownerId={ ownerId }
                messages={ messages }
            />
            <Box className={`${ styles.chatApp__convSendMessage } clearfix`}>
                <InputMessage
                    partner={ partner }
                    sendMessage={sendMessage}
                    isLoading={isLoading}
                    // typing={this.props.typing}
                    // resetTyping={this.props.resetTyping}
                />
            </Box>
        </Box>
    )
}
export default PostChatWidget;
