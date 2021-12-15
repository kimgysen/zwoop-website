import {
    Box,
    Button,
    Collapse,
    Flex,
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
import {Link} from "@chakra-ui/layout/src/link";
import Searchbox from "@components/widgets/searchbox/Searchbox";
import LoginModal from "@components/layout/navbar/modal/LoginModal";
import {signOut, useSession} from "next-auth/react";
import {FaPen} from "react-icons/fa";

const Navbar: React.FC = () => {

    const { data: session, status } = useSession();
    const loading = status === "loading";

    const { isOpen: rightMenuIsOpen, onToggle: rightMenuOnToggle } = useDisclosure();
    const { isOpen: modalIsOpen, onToggle: modalOnOpen, onClose: modalOnClose } = useDisclosure();


    console.log(session);

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
                maxW={"1000"}
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
                        <NextLink href={'/home'} passHref>
                            <Link>Zwoop</Link>
                        </NextLink>
                    </Text>
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <Searchbox />
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
                            <>
                                <Button
                                    as={'a'}
                                    fontSize={'sm'}
                                    fontWeight={400}
                                    variant={'link'}
                                    href={ `/user/${ session.userId }` }>
                                    { session.user?.name }
                                </Button>
                                <Button
                                    bg={'blue.400'}
                                    leftIcon={ <FaPen /> }
                                    rounded={'full'}
                                    color={'white'}
                                    _hover={{ bg: 'blue.500' }}>
                                    <NextLink href={'/setup-post'} passHref>
                                        <Link>Ask</Link>
                                    </NextLink>
                                </Button>
                                <a
                                    href={`/api/auth/signout`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        signOut()
                                    }}
                                >
                                    Sign out
                                </a>
                            </>
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