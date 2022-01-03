import {Circle, IconButton} from '@chakra-ui/react';
import {css} from '@emotion/react';
import {FaComment} from 'react-icons/fa';
import React, {FC} from "react";
import NextLink from "next/link";

interface MessageWidgetProps {
    url: string,
    count: number
}

const MessageWidget: FC<MessageWidgetProps> = ({ url, count }) => {
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
                        {count}
                    </Circle>
                </>}
            />
        </NextLink>
    );
}

export default MessageWidget;
