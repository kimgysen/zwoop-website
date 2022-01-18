import React, {Dispatch, FC, SetStateAction} from "react";
import {Avatar, Box, HStack, Tag, Text, VStack} from "@chakra-ui/react";
import InboxItemReceiveDto from "../../../../../../service/stomp/receive/InboxItemReceiveDto";
import TimeAgo from "react-timeago";
import ChatPartner from "@models/chat/ChatPartner";
import InboxDetail from "@models/chat/InboxDetail";

interface InboxItemProps {
    inboxItem: InboxItemReceiveDto,
    setInboxDetail: Dispatch<SetStateAction<InboxDetail>>
}

const PostInboxItem: FC<InboxItemProps> = (
    { inboxItem, setInboxDetail }) => {

    const partner: ChatPartner = (inboxItem.userId === inboxItem.fromUserId)
        ? { partnerId: inboxItem.toUserId,
            partnerNickName: inboxItem.toNickName,
            partnerAvatar: inboxItem.toAvatar }
        : { partnerId: inboxItem.fromUserId,
            partnerNickName: inboxItem.fromNickName,
            partnerAvatar: inboxItem.fromAvatar };

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
                    >
                        { inboxItem.lastMessage }
                    </Text>
                </Box>
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
