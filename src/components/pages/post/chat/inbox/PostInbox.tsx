import React, {FC, useEffect, useState} from "react";
import {Box, Divider} from "@chakra-ui/react";
import PostInboxItem from "@components/pages/post/chat/inbox/PostInboxItem";
import InboxItemReceiveDto from "../../../../../service/stomp/receive/InboxItemReceiveDto";
import {isInboxEmpty, isLastInboxItem, rebuildInbox, sortInboxItems} from "../../../../../util/InboxUtil";
import {getStompDispatcher} from "../../../../../event_dispatchers/StompDispatcher";
import {
    POST_INBOX__ON_INBOX_UPDATE_RECEIVED,
    POST_INBOX__ON_INIT_ITEMS_RECEIVED
} from "../../../../../event_dispatchers/config/StompEvents";
import PostInboxLoading from "@components/pages/post/chat/inbox/fallbackviews/PostInboxLoading";
import PostInboxEmpty from "@components/pages/post/chat/inbox/fallbackviews/PostInboxEmpty";


interface PostInboxProps {
    postId: string,
    principalId: string
}

const PostInbox: FC<PostInboxProps> = (
    { postId, principalId }) => {
    const [inboxLoading, setInboxLoading] = useState<boolean>(true);
    const [inboxItems, setInboxItems] = useState<InboxItemReceiveDto[]>([]);
    const [lastReceived, setLastReceived] = useState<InboxItemReceiveDto>();

    const stompDispatcher = getStompDispatcher();

    useEffect(() => {
        stompDispatcher.on(POST_INBOX__ON_INIT_ITEMS_RECEIVED, (inboxItems: InboxItemReceiveDto[]) => {
            setInboxLoading(false);
            setInboxItems(sortInboxItems([...inboxItems]));

        });

        stompDispatcher.on(POST_INBOX__ON_INBOX_UPDATE_RECEIVED, (inboxItem: InboxItemReceiveDto) => {
            setLastReceived(inboxItem);
        });

        return function cleanUp() {
            stompDispatcher.remove(POST_INBOX__ON_INIT_ITEMS_RECEIVED);
            stompDispatcher.remove(POST_INBOX__ON_INBOX_UPDATE_RECEIVED);
        }

    }, [inboxLoading, inboxItems]);

    useEffect(() => {
        if (lastReceived) {
            setInboxItems(rebuildInbox(lastReceived, inboxItems));
        }
    }, [lastReceived]);

    return (
        <Box>
            {
                inboxLoading
                && <PostInboxLoading />
            }
            {
                !inboxLoading
                && isInboxEmpty(inboxItems)
                && <PostInboxEmpty />
            }
            {
                !isInboxEmpty(inboxItems)
                &&
                    inboxItems.map((inboxItem, idx) => (
                        <Box key={`inboxItem-${ idx }`}>
                            <PostInboxItem
                                postId={ postId }
                                principalId={ principalId }
                                inboxItem={ inboxItem }
                            />
                            {
                                isLastInboxItem(inboxItems, idx)
                                && <Divider />
                            }
                        </Box>
                    ))
            }
        </Box>
    )
}

export default PostInbox;
