import React, {FC} from "react";
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import ChatRoomUserReceiveDto from "../../../../service/stomp/receive/ChatRoomUserReceiveDto";
import PublicChatBox from "@components/widgets/chat/public/chatbox/PublicChatBox";
import ConnectedUsers from "@components/widgets/chat/public/users/ConnectedUsers";
import PublicMessageReceiveDto from "../../../../service/stomp/receive/PublicMessageReceiveDto";


interface PublicChatProps {
    messages: PublicMessageReceiveDto[],
    connectedUsers: ChatRoomUserReceiveDto[],
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
