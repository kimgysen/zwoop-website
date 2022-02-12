import {FC, useState} from "react";
import {Box, HStack, Input} from "@chakra-ui/react";
import styles from '../PrivateChatWidget.module.css';
import {FaPaperPlane} from 'react-icons/fa';
import ChatPartner from "@models/chat/ChatPartner";
import {handleSendPrivateMessage} from "@components/pages/post/post_chat/private_chat/PrivateChatWidgetHelper";
import {sendStartTyping, sendStopTyping} from "src/service/stomp/publishers/PrivateChatPublisher";


interface InputMessageProps {
    postId: string,
    partner: ChatPartner,
    isLoading: boolean,
    setPartnerUnread: () => void
}

const PrivateInputMessage: FC<InputMessageProps> = ({ postId, partner: partner, isLoading, setPartnerUnread }) => {

    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const loadingClass = isLoading ? styles['chatApp__convButton--loading'] : null;


    const handleChange = (e: any) => {
        const message = e.target.value;
        setInputMessage(message);

        if (message.length > 0 && !isTyping) {
            setIsTyping(true);
            sendStartTyping(partner?.partnerId);

        } else if (message.length === 0 && isTyping) {
            setIsTyping(false);
            sendStopTyping(partner?.partnerId);
        }
    }

    const handleSendMessage = (partner: ChatPartner, message: string) => {
        if (!!message) {
            handleSendPrivateMessage(postId, partner, message);
            setPartnerUnread();

            setInputMessage('');
            setIsTyping(false);
            sendStopTyping(partner?.partnerId);
        }
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

export default PrivateInputMessage;
