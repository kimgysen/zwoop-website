import InboxItemReceiveDto from "../../../../../service/stomp/receive/inbox/InboxItemReceiveDto";
import React, {FC} from "react";
import {Avatar, Box, HStack, Tag, Text, VStack} from "@chakra-ui/react";
import TimeAgo from "react-timeago";
import ChatPartner from "@models/chat/ChatPartner";
import AuthState from "@models/user/AuthState";
import {useRouter} from "next/router";
import {getPartnerFromInboxItem, hasUnreadMessages} from "../../../../../util/InboxUtil";


interface AppInboxItemProps {
    authState: AuthState,
    inboxItem: InboxItemReceiveDto
}

const AppInboxItem: FC<AppInboxItemProps> = ({ authState, inboxItem }) => {

    const router = useRouter();

    const partner: ChatPartner = getPartnerFromInboxItem(inboxItem);

    const handleClickInboxDetail = async () => {
        await router.push(`/post/${ inboxItem.postId }?partnerId=${ partner.partnerId }`);
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
                                hasUnreadMessages(inboxItem) &&
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