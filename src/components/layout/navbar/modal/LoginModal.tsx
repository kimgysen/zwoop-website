import {Button, Stack} from '@chakra-ui/react';
import React from "react";
import {FaFacebook, FaGithub, FaGoogle, FaLinkedin, FaTwitter} from "react-icons/fa";
import ModalWidget from "@components/widgets/modal/Modal";
import {signIn} from 'next-auth/react';

interface LoginModalProps {
    modalIsOpen: boolean,
    modalOnClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ modalIsOpen, modalOnClose }) => {
    return (
        <ModalWidget
            title={ 'Login' }
            isOpen={ modalIsOpen }
            onClose={ modalOnClose }
        >
            <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
            >
                <Button
                    colorScheme='red'
                    leftIcon={<FaGoogle />}
                    onClick={ () => signIn('google') }
                >
                    Gmail
                </Button>
                <Button
                    colorScheme='gray'
                    leftIcon={<FaGithub />}
                    onClick={ () => signIn('github') }
                >
                    Github
                </Button>
                <Button
                    colorScheme='linkedin'
                    leftIcon={<FaLinkedin />}
                    onClick={ () => signIn('linkedin') }
                >
                    LinkedIn
                </Button>
                <Button
                    colorScheme='facebook'
                    leftIcon={<FaFacebook />}
                    onClick={ () => signIn('facebook') }
                >
                    Facebook
                </Button>
                <Button
                    colorScheme='twitter'
                    leftIcon={<FaTwitter />}
                    onClick={ () => signIn('twitter') }
                >
                    Twitter
                </Button>
            </Stack>
        </ModalWidget>
    )

};

export default LoginModal;
