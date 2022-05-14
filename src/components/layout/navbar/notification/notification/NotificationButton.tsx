import {
    Box,
    Circle,
    IconButton,
    Menu,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    useColorModeValue
} from '@chakra-ui/react';
import {css} from '@emotion/react';
import {FaBell} from 'react-icons/fa';
import React, {FC, useState} from "react";
import AuthState from "@models/auth/AuthState";
import NotificationBoxHoc from "@components/layout/navbar/notification/notification/notificationbox/NotificationBoxHoc";

interface NotificationWidgetProps {
    authState: AuthState,
    unreadCount: number,
    resetCount: () => void
}

const NotificationButton: FC<NotificationWidgetProps> = ({ authState, unreadCount, resetCount }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const open = () => setIsOpen(!isOpen)
    const close = () => setIsOpen(false)

    return (
        <Box>
            <Menu>
                <Popover
                    closeOnBlur={true}
                    placement='top-start'
                    isOpen={isOpen}
                    onClose={close}
                >
                    <PopoverTrigger>
                        <IconButton
                            onClick={ async () => {
                                open();
                                resetCount();
                            }}
                            css={css`position: relative !important;`}
                            py={'2'}
                            aria-label={'Notifications'}
                            size={'lg'}
                            background='white'
                            icon={<>
                                <FaBell color={'gray.750'} />
                                {
                                    unreadCount > 0
                                    && (
                                        <Circle as={'span'}
                                                size='20px'
                                                color={'white'}
                                                position={'absolute'}
                                                bottom={'4px'}
                                                right={'4px'}
                                                fontSize={'0.8rem'}
                                                bgColor={'red'}
                                                zIndex={9999} p={'1px'}>
                                            { unreadCount }
                                        </Circle>
                                    )
                                }
                            </>}
                        />
                    </PopoverTrigger>
                    <PopoverContent
                        borderStyle='solid'
                        borderColor={useColorModeValue('gray.200', 'gray.700')}
                        outline={0}
                        _focus={{ boxShadow: "dark-lg" }}
                        fontSize='sm'
                        width='350px'
                    >
                        <PopoverHeader>Show all</PopoverHeader>
                        <PopoverArrow />
                        <PopoverBody>
                            {
                                authState.isLoggedIn
                                && <NotificationBoxHoc
                                    authState={ authState }
                                />
                            }
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Menu>
        </Box>
    );
}

export default NotificationButton;
