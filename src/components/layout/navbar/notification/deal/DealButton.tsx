import {
    Box,
    Circle,
    IconButton,
    Menu,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    useColorModeValue
} from '@chakra-ui/react';
import React, {FC} from "react";
import {css} from '@emotion/react';
import {FaHandshake} from "react-icons/fa";
import AuthState from "@models/user/AuthState";
import DealBox from "@components/layout/navbar/notification/deal/dealbox/DealBox";
import DealOpenedDto from "../../../../../service/stomp/dto/receive/notification/feature/deal/DealOpenedDto";


interface DealButtonProps {
    authState: AuthState
    dealBoxLoading: boolean,
    dealBoxItems?: DealOpenedDto[] | null
}

const DealButton: FC<DealButtonProps> = ({ authState, dealBoxLoading, dealBoxItems }) => {

    const nrItems = dealBoxItems
        ? dealBoxItems.length
        : 0;

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
                                <FaHandshake
                                    color={'gray.750'}
                                />
                                {
                                    nrItems > 0
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
                                            { nrItems }
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
                        <PopoverArrow />
                        <PopoverBody>
                            {
                                authState.isLoggedIn &&
                                <DealBox
                                    authState={ authState }
                                    dealBoxLoading={ dealBoxLoading }
                                    dealBoxItems={ dealBoxItems }
                                />
                            }
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Menu>
        </Box>
    )
}

export default DealButton;
