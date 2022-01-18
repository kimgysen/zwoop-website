import {Circle, IconButton} from '@chakra-ui/react';
import {css} from '@emotion/react';
import {FaComment} from 'react-icons/fa';
import React, {FC, useEffect, useState} from "react";
import NextLink from "next/link";
import {getPrivateMessageDispatcher} from "../../../../event_dispatchers/private_messages/PrivateMessageDispatcher";
import PrivateMessageReceiveDto from "../../../../service/stomp/receive/PrivateMessageReceiveDto";
import InboxItemReceiveDto from "../../../../service/stomp/receive/InboxItemReceiveDto";


interface MessageWidgetProps {
    url: string
}

const MessageWidget: FC<MessageWidgetProps> = ({ url }) => {
    const privateMessageDispatcher = getPrivateMessageDispatcher();

    const [inboxItems, setInboxItems] = useState<InboxItemReceiveDto[]>([]);


    useEffect(() => {
        const listener = (ev: CustomEvent<PrivateMessageReceiveDto>) => {
            const message = ev.detail;
            console.log('navbar message received', message);
        }

        privateMessageDispatcher.addListener(listener);

        return function cleanUp() {
            privateMessageDispatcher.removeListener(listener);
        }
    });

    return (
        <NextLink href={ url }>
            <IconButton
                css={css`
                  position: relative !important;
                `}
                py={'2'}
                aria-label={'Notifications'}
                size={'lg'}
                background='white'
                icon={<>
                    <FaComment color={'gray.750'} />
                    <Circle as={'span'}
                            size='20px'
                            color={'white'}
                            position={'absolute'}
                            bottom={'4px'}
                            right={'4px'}
                            fontSize={'0.8rem'}
                            bgColor={'red'}
                            zIndex={9999} p={'1px'}>
                        1
                    </Circle>
                </>}
            />
        </NextLink>
    );
}

export default MessageWidget;
