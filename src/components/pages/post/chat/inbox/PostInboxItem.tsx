import React, {FC, useEffect, useState} from "react";
import {Avatar, Box, HStack, Tag, Text, VStack} from "@chakra-ui/react";
import InboxItemReceiveDto from "../../../../../service/stomp/receive/inbox/InboxItemReceiveDto";
import TimeAgo from "react-timeago";
import ChatPartner from "@models/chat/ChatPartner";
import PartnerReadDto from "../../../../../service/stomp/receive/private_chat/PartnerReadDto";
import TypingDto from "../../../../../service/stomp/receive/private_chat/TypingDto";
import PartnerTypingBox from "@components/pages/post/chat/private_chat/chatbox/subviews/PartnerTypingBox";
import PartnerReadBox from "@components/pages/post/chat/private_chat/chatbox/subviews/PartnerReadBox";
import {getStompDispatcher} from "../../../../../event_dispatchers/StompDispatcher";
import {
    PRIVATE_CHAT__ON_READ_RECEIVED,
    PRIVATE_CHAT__ON_START_TYPING_RECEIVED,
    PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED
} from "../../../../../event_dispatchers/config/StompEvents";
import {getPartnerFromInboxItem} from "../../../../../util/InboxUtil";
import {useRouter} from "next/router";

interface InboxItemProps {
    postId: string,
    principalId: string,
    inboxItem: InboxItemReceiveDto
}

const PostInboxItem: FC<InboxItemProps> = (
    { postId, principalId, inboxItem }) => {

    const router = useRouter();

    const [hasPartnerReadDto, setHasPartnerReadDto] = useState<PartnerReadDto|null>(null);
    const [partnerIsTyping, setPartnerIsTyping] = useState<boolean>(false);

    const partner: ChatPartner = getPartnerFromInboxItem(inboxItem);

    const stompDispatcher = getStompDispatcher();

    useEffect(() => {
        const eventPostFix = `__${ postId }_${ partner?.partnerId }`;
        if (partner?.partnerId) {
            stompDispatcher.on(PRIVATE_CHAT__ON_READ_RECEIVED + eventPostFix, (partnerReadDto) => {
                setHasPartnerReadDto(partnerReadDto);
            });

            stompDispatcher.on(PRIVATE_CHAT__ON_START_TYPING_RECEIVED + eventPostFix, (typingDto: TypingDto) => {
                setPartnerIsTyping(true);
            });

            stompDispatcher.on(PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED + eventPostFix, (typingDto: TypingDto) => {
                setPartnerIsTyping(false);
            });
        }

        return function cleanUp() {
            stompDispatcher.remove(PRIVATE_CHAT__ON_READ_RECEIVED + eventPostFix);
            stompDispatcher.remove(PRIVATE_CHAT__ON_START_TYPING_RECEIVED + eventPostFix);
            stompDispatcher.remove(PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED + eventPostFix);
        }
    }, [partner?.partnerId, hasPartnerReadDto, partnerIsTyping]);

    const handleClickInboxDetail = () => {
        router.push(`/post/${ postId }?partnerId=${ partner?.partnerId }`);

    }

    return (
        <HStack onClick={ handleClickInboxDetail }
                alignItems="start"
                p='5px'
                py='15px'
                _hover={{background: 'blue.50' }}
                cursor='pointer'
        >
            <Box width='15%'>
                <Avatar
                    name={ inboxItem.fromNickName }
                    src={ partner.partnerAvatar }
                />
            </Box>
            <VStack fontSize='sm'
                    align='left'
                    width='85%'
            >
                <Box>
                    <Text isTruncated
                          fontWeight='semibold'
                          maxW='220px'
                    >
                        <Box as='span'
                             mr='3px'
                        >
                            {
                                inboxItem.unread > 0 &&
                                    <Tag>
                                        <b>{ inboxItem.unread }</b>
                                    </Tag>
                            }
                        </Box>
                        { partner.partnerNickName }
                    </Text>
                </Box>
                <Box>
                    <Text isTruncated
                          color='gray.600'
                    >{
                        inboxItem.fromUserId === principalId
                            && 'You: '
                    }
                    { inboxItem.lastMessage }
                    </Text>
                </Box>
                {
                    inboxItem.fromUserId === principalId &&
                    (inboxItem.hasPartnerRead || !!hasPartnerReadDto)
                    && <PartnerReadBox />
                }
                {
                    partnerIsTyping
                    && <PartnerTypingBox />
                }
                <Box>
                    <Text fontSize='xs'
                          color='gray.500'
                    >
                        <TimeAgo date={ inboxItem.lastMessageDate } />
                    </Text>
                </Box>
            </VStack>
        </HStack>
    )
}

export default PostInboxItem;
