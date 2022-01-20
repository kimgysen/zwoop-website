import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Avatar, Box, HStack, Tag, Text, VStack} from "@chakra-ui/react";
import InboxItemReceiveDto from "../../../../../../service/stomp/receive/InboxItemReceiveDto";
import TimeAgo from "react-timeago";
import ChatPartner from "@models/chat/ChatPartner";
import InboxDetail from "@models/chat/InboxDetail";
import {getPartnerReadDispatcher} from "../../../../../../event_dispatchers/private_messages/PartnerReadDispatcher";
import {
    addPartnerReadListener,
    addStartTypingListener,
    addStopTypingListener
} from "@components/pages/post/helpers/PrivateChatHelper";
import PartnerReadDto from "../../../../../../service/stomp/receive/PartnerReadDto";
import {getStartTypingDispatcher} from "../../../../../../event_dispatchers/private_messages/StartTypingDispatcher";
import TypingDto from "../../../../../../service/stomp/receive/TypingDto";
import {getStopTypingDispatcher} from "../../../../../../event_dispatchers/private_messages/StopTypingDispatcher";
import PartnerTypingBox from "@components/pages/post/chat/post/widgets/PartnerTypingBox";
import PartnerReadBox from "@components/pages/post/chat/post/widgets/PartnerReadBox";

interface InboxItemProps {
    postId: string,
    principalId: string,
    inboxItem: InboxItemReceiveDto,
    setInboxDetail: Dispatch<SetStateAction<InboxDetail>>
}

const PostInboxItem: FC<InboxItemProps> = (
    { postId, principalId, inboxItem, setInboxDetail }) => {

    const partnerReadDispatcher = getPartnerReadDispatcher();
    const startTypingDispatcher = getStartTypingDispatcher();
    const stopTypingDispatcher = getStopTypingDispatcher();

    const [hasPartnerReadDto, setHasPartnerReadDto] = useState<PartnerReadDto|null>(null);
    const [partnerIsTyping, setPartnerIsTyping] = useState<boolean>(false);


    const partner: ChatPartner = (inboxItem.userId === inboxItem.fromUserId)
        ? { partnerId: inboxItem.toUserId,
            partnerNickName: inboxItem.toNickName,
            partnerAvatar: inboxItem.toAvatar }
        : { partnerId: inboxItem.fromUserId,
            partnerNickName: inboxItem.fromNickName,
            partnerAvatar: inboxItem.fromAvatar };

    useEffect(() => {
        const partnerReadListener = addPartnerReadListener((message) => {
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
            partnerReadDispatcher.removeListener(partnerReadListener);
            startTypingDispatcher.removeListener(startTypingListener);
            stopTypingDispatcher.removeListener(stopTypingListener);
        }
    }, []);

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
