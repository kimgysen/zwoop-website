import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Box, Divider, Spinner} from "@chakra-ui/react";
import PostInboxItem from "@components/pages/post/chat/post/inbox/PostInboxItem";
import InboxItemReceiveDto, {mapFromNewPrivateMessage} from "../../../../../../service/stomp/receive/InboxItemReceiveDto";
import InboxDetail from "@models/chat/InboxDetail";
import {getInitInboxDispatcher} from "../../../../../../event_dispatchers/inbox/post_inbox/InitPostInboxDispatcher";
import {getPrivateMessageDispatcher} from "../../../../../../event_dispatchers/private_messages/PrivateMessageDispatcher";
import PrivateMessageReceiveDto from "../../../../../../service/stomp/receive/PrivateMessageReceiveDto";
import {addInboxLoadingListener, addInitInboxListener} from "@components/pages/post/helpers/InboxHelper";
import {addPrivateMessageListener} from "@components/pages/post/helpers/PrivateChatHelper";


interface PostInboxProps {
    setInboxDetail: Dispatch<SetStateAction<InboxDetail>>
}

const PostInbox: FC<PostInboxProps> = (
    { setInboxDetail }) => {

    const initInboxItemsDispatcher = getInitInboxDispatcher();
    const privateMessageDispatcher = getPrivateMessageDispatcher();

    const [inboxLoading, setInboxLoading] = useState<boolean>(true);
    const [inboxItems, setInboxItems] = useState<InboxItemReceiveDto[]>([]);
    const [lastReceived, setLastReceived] = useState<PrivateMessageReceiveDto>();

    const setSortedInboxItems = (inboxItems: InboxItemReceiveDto[]) => {
        const sorted = inboxItems.sort((a, b) => a.lastMessageDate < b.lastMessageDate ? 1 : -1);
        setInboxItems(sorted);
    }

    useEffect(() => {
        const initInboxLoadingListener = addInboxLoadingListener(
            (isLoading: boolean) => setInboxLoading(isLoading));

        const initInboxItemsListener = addInitInboxListener((inboxItems: InboxItemReceiveDto[]) => {
            setInboxLoading(false);
            setSortedInboxItems(inboxItems);
        });

        const privateMessageListener = addPrivateMessageListener((message: PrivateMessageReceiveDto) => {
            setLastReceived(message);
        });

        return function cleanUp() {
            initInboxItemsDispatcher.removeListenerLoading(initInboxLoadingListener)
            initInboxItemsDispatcher.removeListener(initInboxItemsListener);
            privateMessageDispatcher.removeListener(privateMessageListener);
        }

    }, []);

    useEffect(() => {
        if (lastReceived) {
            if (inboxItems.length > 0) {
                const idx = inboxItems.findIndex(item => item.partnerId === lastReceived.fromUserId);
                if (idx !== -1) {
                    inboxItems[idx] = mapFromNewPrivateMessage(inboxItems[idx], lastReceived);
                } else {
                    inboxItems.unshift(mapFromNewPrivateMessage(null, lastReceived));
                }
                setSortedInboxItems(inboxItems);

            } else {
                setInboxItems([mapFromNewPrivateMessage(null, lastReceived)]);
            }

        }

    }, [lastReceived]);

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
