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
import React, {FC} from "react";
import InboxItemReceiveDto from "../../../../../service/stomp/dto/receive/inbox/InboxItemReceiveDto";
import AppInbox from "@components/layout/navbar/notification/inbox/appinbox/AppInbox";
import {css} from "@emotion/react";
import {FaComment} from "react-icons/fa"
import AuthState from "@models/user/AuthState";


interface AppInboxButtonProps {
    authState: AuthState,
    inboxLoading: boolean,
    inboxItems: InboxItemReceiveDto[],
    nrUnread: number
}

const AppInboxButton: FC<AppInboxButtonProps> = ({ authState, inboxLoading, inboxItems, nrUnread }) => {

    return (
        <Box>
            <Menu>
                <Popover
                    closeOnBlur={true}
                    placement='top-start'
                >
                    <PopoverTrigger>
                        <IconButton
                            css={css`position: relative !important;`}
                            py={'2'}
                            aria-label={'Notifications'}
                            size={'lg'}
                            background='white'
                            icon={<>
                                <FaComment color={'gray.750'} />
                                {
                                    nrUnread > 0 &&
                                    <Circle as={'span'}
                                            size='20px'
                                            color={'white'}
                                            position={'absolute'}
                                            bottom={'4px'}
                                            right={'4px'}
                                            fontSize={'0.8rem'}
                                            bgColor={'red'}
                                            zIndex={9999} p={'1px'}>
                                        { nrUnread }
                                    </Circle>
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
                        <PopoverArrow />
                        <PopoverHeader>Show all</PopoverHeader>
                        <PopoverBody>
                            {
                                authState.isLoggedIn &&
                                <AppInbox
                                    authState={ authState }
                                    inboxLoading={ inboxLoading }
                                    inboxItems={ inboxItems }
                                />
                            }
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Menu>
        </Box>
    );
}

export default AppInboxButton;
