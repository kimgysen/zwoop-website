import React, {FC} from "react";
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import ChatUser from "@components/widgets/chat/public/model/ChatUser";
import PublicChatBox from "@components/widgets/chat/public/chatbox/PublicChatBox";
import ConnectedUsers from "@components/widgets/chat/public/users/ConnectedUsers";
import ChatMessage from "@components/widgets/chat/public/model/ChatMessage";


interface PublicChatProps {
    messages: ChatMessage[],
    connectedUsers: ChatUser[],
    sendMessage: (message: string) => void,
}

const PublicChat: FC<PublicChatProps> = ({ messages, sendMessage, connectedUsers }) => {
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
                        <PublicChatBox
                            messages={ messages }
                            sendMessage={ sendMessage }
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

export default PublicChat;
