import React, {FC, useState} from "react";
import {Box, Button, Image, List, ListItem, useColorModeValue} from "@chakra-ui/react";
import AutoResizeTextarea from "@components/pages/tag/chat/public_chat/AutoResizeTextArea";
import PublicMessageReceiveDto from "../../../../../service/stomp/receive/PublicMessageReceiveDto";
import {Flex} from "@chakra-ui/layout/src/flex";
import styles from "@components/pages/post/chat/private_chat/PrivateChatWidget.module.css";
import dayjs from 'dayjs';
import {handleSendPublicMessage} from "@components/pages/tag/chat/public_chat/PublicChatWidgetHelper";


interface ChatBoxProps {
    tagName: string,
    messages: PublicMessageReceiveDto[]
}

const PublicChatWidget: FC<ChatBoxProps> = ({ tagName, messages }) => {

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
                        <List spacing={3}
                              className={styles.chatApp__convTimeline}
                        >
                            {
                                messages.map((chatMessage, index) => (
                                    <ListItem key={`msg-${ index }`}>
                                        <Box className={ styles['chatApp__convMessageItem--right'] }
                                             alignItems='center'
                                             py='8px'
                                        >
                                            <Box
                                                color='grey.50'
                                            >
                                                { dayjs(chatMessage.date).format('DD-MM-YYYY hh:mm') }
                                            </Box>
                                            <Image
                                                src={ chatMessage.fromUserAvatar }
                                                alt={ chatMessage.fromUserId }
                                                className={ styles.chatApp__convMessageAvatar }
                                                w='30px'
                                                h='30px'
                                            />
                                            <Box className={ styles.chatApp__convMessageValue }>
                                                { chatMessage.message }
                                            </Box>
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
                        setMessage('');
                        handleSendPublicMessage( tagName, message)
                    }}
                >
                    send
                </Button>
            </Box>
    )
}

export default PublicChatWidget;
