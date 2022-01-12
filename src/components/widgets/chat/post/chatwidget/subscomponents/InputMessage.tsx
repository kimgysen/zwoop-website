import {FC, useState} from "react";
import {Box, HStack, Input} from "@chakra-ui/react";
import styles from '../PostChatWidget.module.css';
import {FaPaperPlane} from 'react-icons/fa';
import {ChatPartner} from "../../../../../../../pages/post/[postId]";


interface InputMessageProps {
    partner: ChatPartner,
    isLoading: boolean,
    sendMessage: (partner: ChatPartner, message: string) => void
}

const InputMessage: FC<InputMessageProps> = ({ partner: partner, isLoading, sendMessage }) => {

    const [inputMessage, setInputMessage] = useState('');

    const loadingClass = isLoading ? styles['chatApp__convButton--loading'] : null;

    const handleChange = (e: any) => {
        setInputMessage(e.target.value);
    }

    const handleSendMessage = (partner: ChatPartner, message: string) => {
        sendMessage(partner, message);
        setInputMessage('');
    }

    const handleTyping = () => {

    }

    return (
        <HStack>
            <Input
                className={"chatApp__convInput"}
                placeholder="Text message"
                onChange={ handleChange }
                value={ inputMessage }
            />
            <Box className={`${ styles.chatApp__convButton } ${ loadingClass }`}
                 onClick={() => handleSendMessage(partner, inputMessage)}>
                <FaPaperPlane />
            </Box>

        </HStack>
    );
}

export default InputMessage;
