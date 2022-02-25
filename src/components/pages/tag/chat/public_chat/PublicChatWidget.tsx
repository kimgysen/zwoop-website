import React, {FC, useState} from "react";
import {Box, Button, useColorModeValue} from "@chakra-ui/react";
import AutoResizeTextarea from "@components/pages/tag/chat/public_chat/AutoResizeTextArea";
import PublicMessageReceiveDto from "../../../../../models/dto/stomp/receive/public_chat/PublicMessageReceiveDto";
import {handleSendPublicMessage, isEmptyList} from "@components/pages/tag/chat/public_chat/PublicChatWidgetHelper";
import PublicMessageList from "@components/pages/tag/chat/public_chat/chatbox/PublicMessageList";
import PublicMessageListEmpty from "@components/pages/tag/chat/public_chat/fallbackviews/PublicMessageListEmpty";
import PublicMessageListLoading from "@components/pages/tag/chat/public_chat/fallbackviews/PublicMessageListLoading";


interface ChatBoxProps {
    tagName: string,
    principalId: string,
    isLoading: boolean,
    messages: PublicMessageReceiveDto[]
}

const PublicChatWidget: FC<ChatBoxProps> = ({ tagName, principalId, isLoading, messages }) => {

    const [message, setMessage] = useState('');

    const handleInputChange = (e: any) => {
        setMessage(e.target.value)
    }

    return (
        <Box
            borderColor={useColorModeValue('blue.200', 'blue.900')}
            fontSize='sm'
        >
            {
                isLoading
                && <PublicMessageListLoading />
            }
            {
                !isLoading
                && isEmptyList(messages)
                && <PublicMessageListEmpty />
            }
            {
                !isLoading
                && !isEmptyList(messages)
                && (
                    <PublicMessageList
                        messages={messages}
                    />
                )
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
