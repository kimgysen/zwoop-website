import {
    Box,
    Button,
    Collapse,
    Flex,
    HStack,
    IconButton,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import {CloseIcon, HamburgerIcon,} from '@chakra-ui/icons';
import React from "react";
import NextLink from 'next/link'
import Searchbox from "@components/widgets/searchbox/Searchbox";
import LoginModal from "@components/layout/navbar/modal/LoginModal";
import {useSession} from "next-auth/react";
import {FaPen} from "react-icons/fa";
import MessageWidget from "@components/layout/navbar/notification/MessageWidget";
import NotificationWidget from "@components/layout/navbar/notification/NotificationWidget";
import UserWidget from "@components/layout/navbar/user/UserWidget";
import {useRouter} from "next/router";

const Navbar: React.FC = () => {
    const { data: session, status } = useSession();

    const loading = status === "loading";

    const { isOpen: rightMenuIsOpen, onToggle: rightMenuOnToggle } = useDisclosure();
    const { isOpen: modalIsOpen, onToggle: modalOnOpen, onClose: modalOnClose } = useDisclosure();

    const router = useRouter();


    return (
        <Box
            boxShadow={'md'}
            sx={{
                position: 'fixed',
                top: '0',
                width: '100%',
                zIndex: 1000,
            }}
            bg={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('gray.600', 'white')}
        >
            <Flex
                margin={ 'auto' }
                width={{ base: "100%", md: "95%" }}
                maxW={"6xl"}
                minH={'50px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex flex={{ base: 1, md: 2 }} justify={{ base: 'center', md: 'start' }}>
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}>
                        <NextLink href={'/'}>
                            Zwoop
                        </NextLink>
                    </Text>
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <Searchbox
                            onSelectTag={ (tag: string) => router.push(`/tags/${ tag }`) } />
                    </Flex>
                </Flex>

                <Stack
                    display={{ base: 'none', md: 'block' }}
                    flex={{ base: 1 }}
                    justify={'flex-end'}
                    direction={'row'}
                    textAlign={ 'right' }
                    spacing={6}>
                    {
                        loading && <>loading...</>
                    }
                    {
                        session && (
                            <Flex flex={{ base: 1, md: 2 }} justify={{ base: 'center', md: 'end' }}>
                                <HStack mr='15px'>
                                    <MessageWidget
                                        count={1}
                                        url='/chat'
                                    />
                                    <NotificationWidget
                                        count={1}
                                        url='/notifications'
                                    />
                                </HStack>
                                <UserWidget
                                    userId={ session.userId as string }
                                    profilePic={ session.user?.image as string } />
                                <NextLink href={'/ask'}>
                                    <Button
                                        bg={'blue.400'}
                                        leftIcon={ <FaPen /> }
                                        rounded={'full'}
                                        color={'white'}
                                        _hover={{ bg: 'blue.500' }}>
                                            Ask
                                    </Button>
                                </NextLink>
                            </Flex>
                        )
                    }
                    {
                        !session && !loading && (
                            <>
                                <Button
                                    onClick={ modalOnOpen }
                                    display={{ base: 'none', md: 'inline-flex' }}
                                    fontSize={'sm'}
                                    fontWeight={600}
                                    color={'white'}
                                    bg={'pink.400'}
                                    href={'/login'}
                                    _hover={{
                                        bg: 'pink.300',
                                    }}>
                                    Register / Login
                                </Button>
                                <LoginModal
                                    modalIsOpen={ modalIsOpen }
                                    modalOnClose={ modalOnClose }
                                />
                            </>
                        )
                    }
                </Stack>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    justify={{ base: 'right', md: 'start' }}
                    textAlign={{ base: 'right' }}
                    mr={{ base: 2 }}
                    display={{ base: 'flex-end', md: 'none' }}>
                    <IconButton
                        onClick={rightMenuOnToggle}
                        icon={
                            rightMenuIsOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
            </Flex>
            <Collapse in={rightMenuIsOpen} animateOpacity>
            </Collapse>
        </Box>
    );
}

export default Navbar;