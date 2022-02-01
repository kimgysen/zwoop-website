import React, {FC} from "react";
import Inbox from "@components/pages/chat/subscomponents/Inbox";
import CenterContainer from "@components/layout/center/CenterContainer";
import {Box, Flex, useColorModeValue} from "@chakra-ui/react";
import ChatBox from "@components/pages/chat/subscomponents/ChatBox";
import PrivateMessageReceiveDto from "../../../service/stomp/receive/private_chat/PrivateMessageReceiveDto";


interface PrivateChatBoxProps {
    messages: PrivateMessageReceiveDto[]
}

const GeneralAppChatBox: FC<PrivateChatBoxProps> = ({ messages }) => {
    return (
        <CenterContainer>
            <Flex
                mt='20px'
                pt={{ md: '10px' }}
            >
                <Flex
                    flex={ 1 }
                    justifyContent={ 'flex-start' }
                    rounded='md'
                    background='white'
                    height='90vh'
                    padding='20px'
                >
                    <Box
                        display={{ base: 'none', lg: 'block' }}
                        width={{ md: 300 }}
                        mr={{ md: '20px' }}
                        borderRight={1}
                        borderStyle={'solid'}
                        borderColor={useColorModeValue('gray.200', 'gray.900')}
                    >
                        <Inbox />
                    </Box>
                    <Box
                        flex={ 1 }
                        justifyContent={ 'flex-end' }
                    >
                        <ChatBox messages={ [] } />
                    </Box>
                </Flex>
                <Box
                    display={{ base: 'none', lg: 'block' }}
                    width={{ md: 250 }}
                    ml={{ md: '20px' }}
                >
                    Right
                </Box>
            </Flex>
        </CenterContainer>
    )
}

export default GeneralAppChatBox;
