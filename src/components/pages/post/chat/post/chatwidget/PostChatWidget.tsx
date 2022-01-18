import React, {FC, useEffect, useState} from "react";
import {Box} from "@chakra-ui/layout/src/box";
import styles from './PostChatWidget.module.css';
import MessageList from "@components/pages/post/chat/post/chatwidget/subscomponents/MessageList";
import InputMessage from "@components/pages/post/chat/post/chatwidget/subscomponents/InputMessage";
import PrivateMessageReceiveDto from "../../../../../../service/stomp/receive/PrivateMessageReceiveDto";
import ChatPartner from "@models/chat/ChatPartner";
import {getPrivateMessageDispatcher} from "../../../../../../event_dispatchers/private_messages/PrivateMessageDispatcher";
import {getInitPrivateMessagesDispatcher} from "../../../../../../event_dispatchers/private_messages/InitPrivateMessagesDispatcher";
import {
    addInitPartnerReadListener,
    addInitPrivateMessagesListener,
    addPartnerReadListener,
    addPrivateMessageListener,
    addStartTypingListener,
    addStopTypingListener,
    lastMessageSentBy
} from "@components/pages/post/helpers/PrivateChatHelper";
import {sendMarkInboxItemAsRead} from "../../../../../../service/stomp/StompService";
import {getPartnerReadDispatcher} from "../../../../../../event_dispatchers/private_messages/PartnerReadDispatcher";
import PartnerReadDto from "../../../../../../service/stomp/receive/PartnerReadDto";
import {getInitPartnerReadDispatcher} from "../../../../../../event_dispatchers/private_messages/InitPartnerReadDispatcher";
import PartnerReadBox from "@components/pages/post/chat/post/chatwidget/subscomponents/PartnerReadBox";
import {getStartTypingDispatcher} from "../../../../../../event_dispatchers/private_messages/StartTypingDispatcher";
import {getStopTypingDispatcher} from "../../../../../../event_dispatchers/private_messages/StopTypingDispatcher";
import TypingDto from "../../../../../../service/stomp/receive/TypingDto";
import PartnerTypingBox from "@components/pages/post/chat/post/chatwidget/subscomponents/PartnerTypingBox";


interface PostChatWidgetProps {
    postId: string,
    ownerId: string,
    partner: ChatPartner,
    sendMessage: (postId: string, partner: ChatPartner, message: string) => void,
    isLoading: boolean
}

const PostChatWidget: FC<PostChatWidgetProps> = ({ postId, ownerId, partner, sendMessage, isLoading }) => {

    const initPrivateMessageDispatcher = getInitPrivateMessagesDispatcher();
    const privateMessageDispatcher = getPrivateMessageDispatcher();
    const initPartnerReadDispatcher = getInitPartnerReadDispatcher();
    const partnerReadDispatcher = getPartnerReadDispatcher();
    const startTypingDispatcher = getStartTypingDispatcher();
    const stopTypingDispatcher = getStopTypingDispatcher();

    const [messages, setMessages] = useState<PrivateMessageReceiveDto[]>([]);
    const [hasPartnerReadDto, setHasPartnerReadDto] = useState<PartnerReadDto|null>(null);
    const [partnerIsTyping, setPartnerIsTyping] = useState<boolean>(false);


    useEffect(() => {
        if (partner?.partnerId) {
            const initPrivateMessagesListener = addInitPrivateMessagesListener(
                (messages: PrivateMessageReceiveDto[]) => {
                    setMessages(messages);
                    sendMarkInboxItemAsRead(partner?.partnerId);
                });

            const privateMessageListener = addPrivateMessageListener((message: PrivateMessageReceiveDto) => {
                if (partner.partnerId === message.fromUserId || partner.partnerId === message.toUserId ) {
                    setMessages((messages: PrivateMessageReceiveDto[]) => [message, ...messages]);
                    sendMarkInboxItemAsRead(partner?.partnerId);
                }
            });

            const initPartnerReadListener = addInitPartnerReadListener((hasRead: boolean) => {
                if (hasRead) {
                    setHasPartnerReadDto({
                        postId: `post-${postId}`,
                        partnerId: partner?.partnerId
                    });
                }
            });

            const partnerReadListener = addPartnerReadListener((message: PartnerReadDto) => {
                setHasPartnerReadDto(message);
            });

            const startTypingListener = addStartTypingListener((typingDto: TypingDto) => {
                if (typingDto.postId === `post-${postId}` && typingDto.partnerId === partner.partnerId) {
                    setPartnerIsTyping(true);
                }
            });

            const stopTypingListener = addStopTypingListener((typingDto: TypingDto) => {
                if (typingDto.postId === `post-${postId}` && typingDto.partnerId === partner.partnerId) {
                    setPartnerIsTyping(false);
                }
            });

            return function cleanUp() {
                initPrivateMessageDispatcher.removeListener(initPrivateMessagesListener);
                privateMessageDispatcher.removeListener(privateMessageListener);
                initPartnerReadDispatcher.removeListener(initPartnerReadListener);
                partnerReadDispatcher.removeListener(partnerReadListener);
                startTypingDispatcher.removeListener(startTypingListener);
                stopTypingDispatcher.removeListener(stopTypingListener);
            }
        }
    }, [partner?.partnerId]);

    const hasPartnerRead = () => {
        return hasPartnerReadDto
            && hasPartnerReadDto?.postId === `post-${postId}`
            && hasPartnerReadDto?.partnerId === partner?.partnerId
    }


    return (
        <Box>
            <MessageList
                ownerId={ ownerId }
                messages={ messages }
            />
            {
                hasPartnerRead() &&
                lastMessageSentBy(messages) === ownerId &&
                    <PartnerReadBox />
            }
            {
                partnerIsTyping
                    && <PartnerTypingBox />
            }
            <Box className={`${ styles.chatApp__convSendMessage } clearfix`}>
                <InputMessage
                    postId={ postId }
                    partner={ partner }
                    sendMessage={sendMessage}
                    setPartnerUnread={ () => setHasPartnerReadDto(null) }
                    isLoading={isLoading}
                    // typing={this.props.typing}
                    // resetTyping={this.props.resetTyping}
                />
            </Box>
        </Box>
    )
}
export default PostChatWidget;
