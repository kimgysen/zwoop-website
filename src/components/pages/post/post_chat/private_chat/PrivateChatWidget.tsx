import React, {FC, useEffect, useState} from "react";
import {Box} from "@chakra-ui/layout/src/box";
import styles from './PrivateChatWidget.module.css';
import PrivateMessageList from "@components/pages/post/post_chat/private_chat/chatbox/PrivateMessageList";
import PrivateInputMessage from "@components/pages/post/post_chat/private_chat/chatbox/PrivateInputMessage";
import PrivateMessageReceiveDto from "../../../../../service/stomp/receive/private_chat/PrivateMessageReceiveDto";
import ChatPartner from "@models/chat/ChatPartner";
import {sendMarkInboxItemAsRead} from "../../../../../service/stomp/StompService";
import PartnerReadDto from "../../../../../service/stomp/receive/private_chat/PartnerReadDto";
import PartnerReadBox from "@components/pages/post/post_chat/private_chat/chatbox/subviews/PartnerReadBox";
import TypingDto from "../../../../../service/stomp/receive/private_chat/TypingDto";
import PartnerTypingBox from "@components/pages/post/post_chat/private_chat/chatbox/subviews/PartnerTypingBox";
import {
    hasPartnerRead,
    isEmptyList,
    lastMessageWasSentByPrincipal
} from "@components/pages/post/post_chat/private_chat/PrivateChatWidgetHelper";
import {getStompDispatcher} from "../../../../../event_dispatchers/StompDispatcher";
import {
    PRIVATE_CHAT__INIT_IS_READ_RECEIVED,
    PRIVATE_CHAT__INIT_IS_WRITING_RECEIVED,
    PRIVATE_CHAT__ON_INIT_MESSAGES_RECEIVED,
    PRIVATE_CHAT__ON_MESSAGE_RECEIVED,
    PRIVATE_CHAT__ON_READ_RECEIVED,
    PRIVATE_CHAT__ON_START_TYPING_RECEIVED,
    PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED
} from "../../../../../event_dispatchers/config/StompEvents";
import PrivateMessageListEmpty
    from "@components/pages/post/post_chat/private_chat/chatbox/fallbackviews/PrivateMessageListEmpty";
import PrivateMessageListLoading
    from "@components/pages/post/post_chat/private_chat/chatbox/fallbackviews/PrivateMessageListLoading";
import {getAppDispatcher} from "../../../../../event_dispatchers/AppDispatcher";
import {APP_INBOX__ITEM_READ} from "../../../../../event_dispatchers/config/AppEvents";


interface PostChatWidgetProps {
    postId: string,
    principalId: string,
    partner: ChatPartner,
    isLoading: boolean
}

const PrivateChatWidget: FC<PostChatWidgetProps> = ({ postId, principalId, partner, isLoading }) => {

    const [markAsReadPending, setMarkAsReadPending] = useState<boolean>(false);
    const [isPageVisible, setPageVisible] = useState<boolean>(true);
    const [messagesLoading, setMessagesLoading] = useState<boolean>(true);
    const [messages, setMessages] = useState<PrivateMessageReceiveDto[]>([]);
    const [hasPartnerReadDto, setHasPartnerReadDto] = useState<PartnerReadDto|null>(null);
    const [partnerIsTyping, setPartnerIsTyping] = useState<boolean>(false);

    const stompDispatcher = getStompDispatcher();
    const appDispatcher = getAppDispatcher();

    const onFocus = () => {
        setPageVisible(true);
        if (markAsReadPending) {
            sendMarkInboxItemAsRead(partner?.partnerId);
        }
    }

    const onBlur = () => {
        setPageVisible(false);
    }

    useEffect(() => {
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);

        const eventPostFix = `__${ postId }_${ partner?.partnerId }`;

        stompDispatcher.on(PRIVATE_CHAT__ON_INIT_MESSAGES_RECEIVED, (messages: PrivateMessageReceiveDto[]) => {
            setMessagesLoading(false);
            setMessages(messages);
            sendMarkInboxItemAsRead(partner?.partnerId);
            appDispatcher.dispatch(APP_INBOX__ITEM_READ, partner?.partnerId);
        });

        stompDispatcher.on(PRIVATE_CHAT__ON_MESSAGE_RECEIVED,(message: PrivateMessageReceiveDto) => {
            if (partner.partnerId === message.fromUserId || partner.partnerId === message.toUserId ) {
                setMessages((messages: PrivateMessageReceiveDto[]) => [message, ...messages]);

                if (isPageVisible) {
                    sendMarkInboxItemAsRead(partner?.partnerId);
                    setMarkAsReadPending(false);
                    appDispatcher.dispatch(APP_INBOX__ITEM_READ, partner?.partnerId);
                } else {
                    setMarkAsReadPending(true);
                }
            }
        });

        stompDispatcher.on(PRIVATE_CHAT__INIT_IS_READ_RECEIVED, (hasRead: boolean) => {
            if (hasRead) {
                setHasPartnerReadDto({
                    postId: postId,
                    partnerId: partner?.partnerId
                });
            }
        });

        stompDispatcher.on(PRIVATE_CHAT__ON_READ_RECEIVED + eventPostFix, (partnerDto: PartnerReadDto) =>
            setHasPartnerReadDto(partnerDto));

        stompDispatcher.on(PRIVATE_CHAT__INIT_IS_WRITING_RECEIVED, (isWriting: boolean) =>
            setPartnerIsTyping(isWriting));

        stompDispatcher.on(PRIVATE_CHAT__ON_START_TYPING_RECEIVED + eventPostFix, (typingDto: TypingDto) => {
            if (typingDto.postId === postId && typingDto.partnerId === partner.partnerId) {
                setPartnerIsTyping(true);
            }
        });

        stompDispatcher.on(PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED + eventPostFix, (typingDto: TypingDto) => {
            if (typingDto.postId === postId && typingDto.partnerId === partner.partnerId) {
                setPartnerIsTyping(false);
            }
        });

        return function cleanUp() {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);

            stompDispatcher.remove(PRIVATE_CHAT__ON_INIT_MESSAGES_RECEIVED);
            stompDispatcher.remove(PRIVATE_CHAT__ON_MESSAGE_RECEIVED);
            stompDispatcher.remove(PRIVATE_CHAT__INIT_IS_READ_RECEIVED);
            stompDispatcher.remove(PRIVATE_CHAT__ON_READ_RECEIVED + eventPostFix);
            stompDispatcher.remove(PRIVATE_CHAT__INIT_IS_WRITING_RECEIVED);
            stompDispatcher.remove(PRIVATE_CHAT__ON_START_TYPING_RECEIVED + eventPostFix);
            stompDispatcher.remove(PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED + eventPostFix);

        }
    }, [partner?.partnerId, isPageVisible, messages, markAsReadPending, hasPartnerReadDto, partnerIsTyping]);


    return (
        <>
            {
                messagesLoading
                && <PrivateMessageListLoading />
            }
            {
                isEmptyList(messages)
                && !messagesLoading
                && <PrivateMessageListEmpty />
            }
            {
                !isEmptyList(messages)
                && (
                    <PrivateMessageList
                        principalId={ principalId }
                        messages={ messages }
                    />
                )
            }
            {
                hasPartnerRead(hasPartnerReadDto, postId, partner)
                && lastMessageWasSentByPrincipal(messages, principalId)
                && (
                    <Box pl='20px'>
                        <PartnerReadBox />
                    </Box>
                )
            }
            {
                partnerIsTyping
                && (
                    <Box pl='20px'>
                        <PartnerTypingBox />
                    </Box>
                )
            }

            <Box className={`${ styles.chatApp__convSendMessage } clearfix`}>
                <PrivateInputMessage
                    postId={ postId }
                    partner={ partner }
                    setPartnerUnread={ () => setHasPartnerReadDto(null) }
                    isLoading={isLoading}
                />
            </Box>
        </>
    )
}
export default PrivateChatWidget;

