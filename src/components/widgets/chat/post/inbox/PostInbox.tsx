import React, {Dispatch, FC, SetStateAction} from "react";
import {Box, Divider, Spinner} from "@chakra-ui/react";
import PostInboxItem from "@components/widgets/chat/post/inbox/PostInboxItem";
import InboxItemReceiveDto from "../../../../../service/stomp/receive/InboxItemReceiveDto";
import {InboxDetail} from "../../../../../../pages/post/[postId]";


interface PostInboxProps {
    inboxLoading: boolean,
    inboxItems: InboxItemReceiveDto[],
    setInboxDetail: Dispatch<SetStateAction<InboxDetail>>
}

const PostInbox: FC<PostInboxProps> = (
    { inboxLoading, inboxItems, setInboxDetail }) => {

    return (
        <Box>
            {
                inboxLoading
                && <Spinner />
            }
            {
                !inboxLoading && (!inboxItems || inboxItems.length === 0) &&
                    <Box p={ 5 }>
                        <i>No messages</i>
                    </Box>
            }
            {
                inboxItems && inboxItems.length > 0 &&
                    inboxItems.map((inboxItem, index) => (
                        <Box key={`inboxItem-${ index }`}>
                            <PostInboxItem
                                inboxItem={ inboxItem }
                                setInboxDetail={ setInboxDetail }
                            />
                            {
                                inboxItems.length > 1 &&
                                <Divider />
                            }
                        </Box>
                    ))
            }
        </Box>
    )
}

export default PostInbox;
