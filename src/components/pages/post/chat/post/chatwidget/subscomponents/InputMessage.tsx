import {FC, useState} from "react";
import {Box, HStack, Input} from "@chakra-ui/react";
import styles from '../PostChatWidget.module.css';
import {FaPaperPlane} from 'react-icons/fa';
import ChatPartner from "@models/chat/ChatPartner";
import {sendStartTyping, sendStopTyping} from "../../../../../../../service/stomp/StompService";


interface InputMessageProps {
    postId: string,
    partner: ChatPartner,
    isLoading: boolean,
    sendMessage: (postId: string, partner: ChatPartner, message: string) => void,
    setPartnerUnread: () => void
}

const InputMessage: FC<InputMessageProps> = ({ postId, partner: partner, isLoading, sendMessage, setPartnerUnread }) => {

    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const loadingClass = isLoading ? styles['chatApp__convButton--loading'] : null;


    const handleChange = (e: any) => {
        const message = e.target.value;
        setInputMessage(message);

        if (message.length > 0 && !isTyping) {
            sendStartTyping(partner?.partnerId);
            setIsTyping(true);

        } else if (message.length === 0 && isTyping) {
            sendStopTyping(partner?.partnerId);
            setIsTyping(false);
        }
    }

    const handleSendMessage = (partner: ChatPartner, message: string) => {
        if (!!message) {
            sendMessage(postId, partner, message);
            setPartnerUnread();

            setInputMessage('');
            setIsTyping(false);
            sendStopTyping(partner?.partnerId);
        }
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
