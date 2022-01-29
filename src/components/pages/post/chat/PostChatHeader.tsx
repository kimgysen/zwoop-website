import React, {Dispatch, FC, SetStateAction} from "react";
import {Divider, Heading, HStack, IconButton, Text} from "@chakra-ui/react";
import {FaChevronLeft} from 'react-icons/fa';
import InboxDetail from "@models/chat/InboxDetail";


interface PostChatHeaderProps {
    isOwner: boolean,
    partnerNickName?: string | null,
    inboxDetail: InboxDetail,
    setInboxDetail: Dispatch<SetStateAction<InboxDetail>>
}

const PostChatHeader: FC<PostChatHeaderProps> =
    ({ isOwner, partnerNickName, inboxDetail, setInboxDetail }) => {

    const backToInbox = () => {
        setInboxDetail({
            isActive: false,
            partner: undefined
        });
    }

    return (
        <>
            <Heading as='h2'
                     size='sm'
                     p='10px'>
                {
                    isOwner && !inboxDetail.isActive &&
                        <Text>Inbox</Text>
                }
                {
                    isOwner && inboxDetail.isActive &&
                        <HStack>
                            <IconButton as='span'
                                 w='5%'
                                 onClick={ backToInbox }
                                 colorScheme="blue"
                                 aria-label="Search database"
                                 icon={<FaChevronLeft />}
                            />
                            <Text w='95%' isTruncated>
                                { inboxDetail.partner?.partnerNickName }
                            </Text>
                        </HStack>
                }
                {
                    !isOwner &&
                        <Text>{ partnerNickName }</Text>
                }
            </Heading>
            <Divider />

        </>
    );

}

export default PostChatHeader;