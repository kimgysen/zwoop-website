import React, {FC, useState} from "react";
import {Box, Button, List, ListItem, useColorModeValue} from "@chakra-ui/react";
import AutoResizeTextarea from "@components/widgets/chat/public/AutoResizeTextArea";
import PublicChatMessage from "@components/widgets/chat/public/model/PublicChatMessage";
import {Flex} from "@chakra-ui/layout/src/flex";


interface ChatBoxProps {
    messages: PublicChatMessage[],
    sendMessage: (message: string) => void
}

const PublicChatBox: FC<ChatBoxProps> = ({ messages, sendMessage }) => {

    const [message, setMessage] = useState('');

    const handleInputChange = (e: any) => {
        setMessage(e.target.value)
    }

    return (
        <Box
            borderColor={useColorModeValue('blue.200', 'blue.900')}
            align='right'
            fontSize='sm'
        >
            {
                messages.length === 0 &&
                <Box
                    textAlign='left'
                    padding='10px'>
                    <i>No messages found</i>
                </Box>
            }
            {
                messages.length > 0 &&

                <Flex
                direction='column-reverse'
                maxHeight='70vh'
                textAlign='left'
                overflowY="scroll"
            >
                    <List spacing={3}>
                        {
                            messages.map((chatMessage, index) => (
                                <ListItem key={`msg-${ index }`}>
                                    <Box
                                        padding='10px'
                                        background='white'
                                        rounded='sm'
                                    >
                                        <Box color='blue.400'>
                                            { chatMessage.fromUserId }:
                                        </Box>
                                        { chatMessage.message }
                                    </Box>
                                </ListItem>
                            ))
                        }
                    </List>
                </Flex>
            }

            <AutoResizeTextarea
                mt='10px'
                background='white'
                placeholder='Send message'
                size='sm'
                value={ message }
                onChange={ handleInputChange }
            />
            <Button
                mt='10px'
                bg={'blue.400'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}
                onClick={ () => {
                    console.log('send message', message);
                    setMessage('');
                    sendMessage(message)
                }}
            >
                send
            </Button>
        </Box>
    )
}

export default PublicChatBox;
