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
import React, {FC, useState} from "react";
import {css} from '@emotion/react';
import {FaHandshake} from "react-icons/fa";
import AuthState from "@models/auth/AuthState";
import DealBox from "@components/layout/navbar/notification/deal/dealbox/DealBox";
import DealDto from "@models/dto/rest/receive/deal/DealDto";


interface DealButtonProps {
    authState: AuthState
    dealBoxLoading: boolean,
    dealDtoList?: DealDto[] | null
}

const DealButton: FC<DealButtonProps> = ({ authState, dealBoxLoading, dealDtoList }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const open = () => setIsOpen(!isOpen)
    const close = () => setIsOpen(false)

    const nrItems = dealDtoList
        ? dealDtoList.length
        : 0;

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
                            onClick={ open }
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
                                    dealDtoList={ dealDtoList }
                                    closePopup={ close }
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
