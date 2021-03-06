import React, {FC, useEffect, useState} from "react";
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import ChatRoomUserReceiveDto from "@models/dto/stomp/receive/public_chat/ChatRoomUserReceiveDto";
import PublicChatWidget from "@components/pages/tag/chat/public_chat/PublicChatWidget";
import ConnectedUsers from "@components/pages/tag/chat/connected_users/ConnectedUsers";
import PublicMessageReceiveDto from "@models/dto/stomp/receive/public_chat/PublicMessageReceiveDto";
import {getStompDispatcher} from "../../../../event_dispatchers/StompDispatcher";
import {
    PUBLIC_CHAT__INIT_CONNECTED_USERS,
    PUBLIC_CHAT__INIT_MESSAGES_LOADING,
    PUBLIC_CHAT__ON_INIT_MESSAGES_RECEIVED,
    PUBLIC_CHAT__ON_MESSAGE_RECEIVED,
    PUBLIC_CHAT__ON_USER_CONNECTED
} from "../../../../event_dispatchers/config/StompEvents";
import AuthState from "@models/auth/AuthState";


interface TagChatProps {
    authState: AuthState,
    tagName: string
}

const TagChatWidget: FC<TagChatProps> = ({ authState, tagName }) => {

    const [isLoading, setLoading] = useState<boolean>(true);
    const [messages, setMessages] = useState<PublicMessageReceiveDto[]>([]);
    const [connectedUsers, setConnectedUsers] = useState<ChatRoomUserReceiveDto[]>([]);

    const stompDispatcher = getStompDispatcher();

    useEffect(() => {
        if (tagName) {

            stompDispatcher.on(PUBLIC_CHAT__INIT_MESSAGES_LOADING, () => {
                setLoading(true);
            });

            stompDispatcher.on(PUBLIC_CHAT__ON_INIT_MESSAGES_RECEIVED, (chatMessages: PublicMessageReceiveDto[]) => {
                setMessages(chatMessages);
                setLoading(false);
            });

            stompDispatcher.on(PUBLIC_CHAT__ON_MESSAGE_RECEIVED, (chatMessage: PublicMessageReceiveDto) => {
                setMessages([chatMessage, ...messages]);
            });

            stompDispatcher.on(PUBLIC_CHAT__INIT_CONNECTED_USERS, (connectedUsers: ChatRoomUserReceiveDto[]) => {
                setConnectedUsers(connectedUsers);
            });

            stompDispatcher.on(PUBLIC_CHAT__ON_USER_CONNECTED, (connectedUsers: ChatRoomUserReceiveDto[]) => {
                setConnectedUsers(connectedUsers);
            });

            return function cleanUp() {
                stompDispatcher.remove(PUBLIC_CHAT__INIT_MESSAGES_LOADING);
                stompDispatcher.remove(PUBLIC_CHAT__ON_INIT_MESSAGES_RECEIVED);
                stompDispatcher.remove(PUBLIC_CHAT__ON_MESSAGE_RECEIVED);
                stompDispatcher.remove(PUBLIC_CHAT__INIT_CONNECTED_USERS);
                stompDispatcher.remove(PUBLIC_CHAT__ON_USER_CONNECTED);
            }

        }

    }, [tagName, messages, connectedUsers]);

    return (
        <Box>
            <Tabs
                id='tabs'
                align='end'
                size='sm'
                isLazy
            >
                <TabList>
                    <Tab>Chat</Tab>
                    <Tab>Connected users</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <PublicChatWidget
                            authState={ authState }
                            tagName={ tagName }
                            isLoading={ isLoading }
                            messages={ messages }
                        />
                    </TabPanel>
                    <TabPanel>
                        <ConnectedUsers
                            connectedUsers={ connectedUsers }
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default TagChatWidget;
