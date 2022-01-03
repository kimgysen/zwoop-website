import React, {FC} from "react";
import PrivateChatMessage from "@components/widgets/chat/private/model/PrivateChatMessage";
import UserList from "@components/widgets/chat/private/UserList";
import CenterContainer from "@components/layout/center/CenterContainer";
import {Box, Flex, useColorModeValue} from "@chakra-ui/react";
import ChatBox from "@components/widgets/chat/private/ChatBox";


interface PrivateChatBoxProps {
    messages: PrivateChatMessage[]
}

const PrivateChatBox: FC<PrivateChatBoxProps> = ({ messages }) => {
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
                        <UserList />
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

export default PrivateChatBox;
