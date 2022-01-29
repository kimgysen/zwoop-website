import InboxItemReceiveDto from "../../../../../service/stomp/receive/InboxItemReceiveDto";
import React, {FC} from "react";
import {Avatar, Box, HStack, Tag, Text, VStack} from "@chakra-ui/react";
import TimeAgo from "react-timeago";
import ChatPartner from "@models/chat/ChatPartner";
import AuthState from "@models/user/AuthState";


interface AppInboxItemProps {
    authState: AuthState,
    inboxItem: InboxItemReceiveDto
}

const AppInboxItem: FC<AppInboxItemProps> = ({ authState, inboxItem }) => {

    const partner: ChatPartner = (inboxItem.userId === inboxItem.fromUserId)
        ? { partnerId: inboxItem.toUserId,
            partnerNickName: inboxItem.toNickName,
            partnerAvatar: inboxItem.toAvatar }
        : { partnerId: inboxItem.fromUserId,
            partnerNickName: inboxItem.fromNickName,
            partnerAvatar: inboxItem.fromAvatar };

    const handleClickInboxDetail = () => {
        console.log('click');
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
                        inboxItem.fromUserId === authState.principalId
                        && 'You: '
                    }
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
export default AppInboxItem;