import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Avatar, Box, HStack, Tag, Text, VStack} from "@chakra-ui/react";
import InboxItemReceiveDto from "../../../../../service/stomp/receive/InboxItemReceiveDto";
import TimeAgo from "react-timeago";
import ChatPartner from "@models/chat/ChatPartner";
import InboxDetail from "@models/chat/InboxDetail";
import PartnerReadDto from "../../../../../service/stomp/receive/PartnerReadDto";
import TypingDto from "../../../../../service/stomp/receive/TypingDto";
import PartnerTypingBox from "@components/pages/post/chat/private_chat/chatbox/subviews/PartnerTypingBox";
import PartnerReadBox from "@components/pages/post/chat/private_chat/chatbox/subviews/PartnerReadBox";
import {getStompDispatcher} from "../../../../../event_dispatchers/EventDispatcher";
import {
    PRIVATE_CHAT__ON_READ_RECEIVED, PRIVATE_CHAT__ON_START_TYPING_RECEIVED, PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED
} from "../../../../../event_dispatchers/config/stompevents";

interface InboxItemProps {
    postId: string,
    principalId: string,
    inboxItem: InboxItemReceiveDto,
    setInboxDetail: Dispatch<SetStateAction<InboxDetail>>
}

const PostInboxItem: FC<InboxItemProps> = (
    { postId, principalId, inboxItem, setInboxDetail }) => {

    const [hasPartnerReadDto, setHasPartnerReadDto] = useState<PartnerReadDto|null>(null);
    const [partnerIsTyping, setPartnerIsTyping] = useState<boolean>(false);

    const partner: ChatPartner = (inboxItem.userId === inboxItem.fromUserId)
        ? { partnerId: inboxItem.partnerId,
            partnerNickName: inboxItem.toNickName,
            partnerAvatar: inboxItem.toAvatar }
        : { partnerId: inboxItem.partnerId,
            partnerNickName: inboxItem.fromNickName,
            partnerAvatar: inboxItem.fromAvatar };

    const stompDispatcher = getStompDispatcher();

    useEffect(() => {
        const eventPostFix = `__post-${ postId }_${ partner?.partnerId }`;
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
        setInboxDetail({
            isActive: true,
            partner
        })
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
                    (inboxItem.hasPartnerRead || !!hasPartnerReadDto) &&
                        <PartnerReadBox />
                }
                {
                    partnerIsTyping &&
                        <PartnerTypingBox />
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
