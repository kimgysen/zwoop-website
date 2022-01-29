import {Circle, IconButton} from '@chakra-ui/react';
import {css} from '@emotion/react';
import {FaBell} from 'react-icons/fa';
import React, {FC} from "react";

interface NotificationWidgetProps {
    url: string,
    count: number
}

const NotificationButton: FC<NotificationWidgetProps> = ({ url, count }) => {
    return (
        <IconButton
            css={css`position: relative !important;`}
            py={'2'}
            aria-label={'Notifications'}
            size={'lg'}
            background='white'
            icon={<>
                <FaBell color={'gray.750'} />
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
    );
}

export default NotificationButton;
