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
import {css} from '@emotion/react';
import {FaComment} from 'react-icons/fa';
import React, {FC, useEffect, useState} from "react";
import InboxItemReceiveDto from "../../../../../service/stomp/receive/InboxItemReceiveDto";
import AppInbox from "@components/layout/navbar/notification/inbox/AppInbox";
import {rebuildInbox, sortInboxItems} from "../../../../../util/InboxUtil";
import AuthState from "@models/user/AuthState";
import {getStompDispatcher} from "../../../../../event_dispatchers/EventDispatcher";
import {
    APP_INBOX__ON_INBOX_UPDATE_RECEIVED,
    APP_INBOX__ON_INIT_ITEMS_LOADING,
    APP_INBOX__ON_INIT_ITEMS_RECEIVED
} from "../../../../../event_dispatchers/config/stompevents";


interface AppInboxButtonProps {
    authState: AuthState,
    url: string
}

const AppInboxButton: FC<AppInboxButtonProps> = ({ authState, url }) => {

    const [inboxLoading, setInboxLoading] = useState<boolean>(true);
    const [inboxItems, setInboxItems] = useState<InboxItemReceiveDto[]>([]);
    const [lastReceived, setLastReceived] = useState<InboxItemReceiveDto>();

    const stompDispatcher = getStompDispatcher();

    useEffect(() => {
        if (authState.isLoggedIn) {
            stompDispatcher.on(APP_INBOX__ON_INIT_ITEMS_LOADING, (isLoading: boolean) =>
                setInboxLoading(isLoading));

            stompDispatcher.on(APP_INBOX__ON_INIT_ITEMS_RECEIVED, (inboxItems: InboxItemReceiveDto[]) => {
                setInboxLoading(false);
                setInboxItems(sortInboxItems(inboxItems));
            });

            stompDispatcher.on(APP_INBOX__ON_INBOX_UPDATE_RECEIVED, (inboxItem: InboxItemReceiveDto) => {
                setLastReceived(inboxItem);
            });
        }

        return function cleanUp() {
            stompDispatcher.remove(APP_INBOX__ON_INIT_ITEMS_LOADING);
            stompDispatcher.remove(APP_INBOX__ON_INIT_ITEMS_RECEIVED);
            stompDispatcher.remove(APP_INBOX__ON_INBOX_UPDATE_RECEIVED);
        }
    }, [authState.isLoggedIn, inboxItems]);

    useEffect(() => {
        if (lastReceived) {
            setInboxItems(rebuildInbox(lastReceived, inboxItems));
        }
    }, [lastReceived]);

    const unreadItems = inboxItems.filter(item => item.unread > 0);

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
                            unreadItems.length > 0 &&
                                <Circle as={'span'}
                                        size='20px'
                                        color={'white'}
                                        position={'absolute'}
                                        bottom={'4px'}
                                        right={'4px'}
                                        fontSize={'0.8rem'}
                                        bgColor={'red'}
                                        zIndex={9999} p={'1px'}>
                                    { unreadItems.length }
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
