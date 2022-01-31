import {
    Circle,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    useColorModeValue
} from '@chakra-ui/react';
import React, {FC, useEffect, useState} from "react";
import InboxItemReceiveDto from "../../../../../service/stomp/receive/InboxItemReceiveDto";
import AppInbox from "@components/layout/navbar/notification/inbox/AppInbox";
import {countUnreadMessages, rebuildInbox, sortInboxItems} from "../../../../../util/InboxUtil";
import AuthState from "@models/user/AuthState";
import {getStompDispatcher} from "../../../../../event_dispatchers/StompDispatcher";
import {
    APP_INBOX__ON_INBOX_UPDATE_RECEIVED,
    APP_INBOX__ON_INIT_ITEMS_LOADING,
    APP_INBOX__ON_INIT_ITEMS_RECEIVED
} from "../../../../../event_dispatchers/config/StompEvents";
import {getAppDispatcher} from "../../../../../event_dispatchers/AppDispatcher";
import {APP_INBOX__ITEM_READ} from "../../../../../event_dispatchers/config/AppEvents";
import {resetCounterForPartner} from "@components/pages/post/chat/private_chat/PrivateChatWidgetHelper";
import {css} from "@emotion/react";
import {FaComment} from "react-icons/fa"


interface AppInboxButtonProps {
    authState: AuthState,
    url: string
}

const AppInboxButton: FC<AppInboxButtonProps> = ({ authState, url }) => {

    const [inboxLoading, setInboxLoading] = useState<boolean>(true);
    const [inboxItems, setInboxItems] = useState<InboxItemReceiveDto[]>([]);
    const [lastReceived, setLastReceived] = useState<InboxItemReceiveDto>();
    const [nrUnread, setNrUnread] = useState<number>(0);

    const stompDispatcher = getStompDispatcher();
    const appDispatcher = getAppDispatcher();

    useEffect(() => {
        if (authState.isLoggedIn) {
            stompDispatcher.on(APP_INBOX__ON_INIT_ITEMS_LOADING, (isLoading: boolean) =>
                setInboxLoading(isLoading));

            stompDispatcher.on(APP_INBOX__ON_INIT_ITEMS_RECEIVED, (inboxItems: InboxItemReceiveDto[]) => {
                setInboxLoading(false);
                setInboxItems(sortInboxItems(inboxItems));
                setNrUnread(countUnreadMessages(inboxItems));
            });

            stompDispatcher.on(APP_INBOX__ON_INBOX_UPDATE_RECEIVED, (inboxItem: InboxItemReceiveDto) => {
                setLastReceived(inboxItem);
                setNrUnread(countUnreadMessages(inboxItems));
            });

            appDispatcher.on(APP_INBOX__ITEM_READ, (partnerId: string) => {
                const updatedItems = resetCounterForPartner(inboxItems, partnerId);
                setInboxItems(updatedItems);
                setNrUnread(countUnreadMessages(inboxItems));
            });
        }

        return function cleanUp() {
            stompDispatcher.remove(APP_INBOX__ON_INIT_ITEMS_LOADING);
            stompDispatcher.remove(APP_INBOX__ON_INIT_ITEMS_RECEIVED);
            stompDispatcher.remove(APP_INBOX__ON_INBOX_UPDATE_RECEIVED);
            appDispatcher.remove(APP_INBOX__ITEM_READ);
        }
    }, [authState.isLoggedIn, inboxItems, nrUnread]);

    useEffect(() => {
        if (lastReceived) {
            setInboxItems(rebuildInbox(lastReceived, inboxItems));
        }
    }, [lastReceived]);

    return (
        <Popover
            closeOnBlur={true}
            placement='top-start'
        >
            <PopoverTrigger>
                <IconButton
                    css={css`position: relative !important;`}
                    py={'2'}
                    aria-label={'Notifications'}
                    size={'lg'}
                    background='white'
                    icon={<>
                        <FaComment color={'gray.750'} />
                        {
                            nrUnread > 0 &&
                            <Circle as={'span'}
                                    size='20px'
                                    color={'white'}
                                    position={'absolute'}
                                    bottom={'4px'}
                                    right={'4px'}
                                    fontSize={'0.8rem'}
                                    bgColor={'red'}
                                    zIndex={9999} p={'1px'}>
                                { nrUnread }
                            </Circle>
                        }
                    </>}
                />
            </PopoverTrigger>
            <PopoverContent
                borderStyle='solid'
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                outline={0}
                _focus={{ boxShadow: "dark-lg" }}
                fontSize='sm'
                width='350px'
            >
                <PopoverArrow />
                <PopoverHeader>Show fullscreen</PopoverHeader>
                <PopoverBody>
                    {
                        authState.isLoggedIn &&
                            <AppInbox
                                authState={ authState }
                                inboxLoading={ inboxLoading }
                                inboxItems={ inboxItems }
                            />
                    }
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}

export default AppInboxButton;
