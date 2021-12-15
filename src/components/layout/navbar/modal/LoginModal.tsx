import {Button, Stack} from '@chakra-ui/react';
import React, {useState} from "react";
import {FaFacebook, FaGithub, FaGoogle, FaLinkedin, FaTwitter} from "react-icons/fa";
import ModalWidget from "@components/widgets/modal/Modal";
import NewWindow from 'react-new-window';

interface LoginModalProps {
    modalIsOpen: boolean,
    modalOnClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ modalIsOpen, modalOnClose }) => {
    const [popup, setPopUp] = useState({ open: false, provider: '' });

    const handleClick = (provider: string) => {
        setPopUp({ open: true, provider });
    }

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
                    onClick={ () => handleClick('google') }
                >
                    Gmail
                </Button>
                <Button
                    colorScheme='gray'
                    leftIcon={<FaGithub />}
                    onClick={ () => handleClick('github') }
                >
                    Github
                </Button>
                <Button
                    colorScheme='linkedin'
                    leftIcon={<FaLinkedin />}
                    onClick={ () => handleClick('linkedin') }
                >
                    LinkedIn
                </Button>
                <Button
                    colorScheme='facebook'
                    leftIcon={<FaFacebook />}
                    onClick={ () => handleClick('facebook') }
                >
                    Facebook
                </Button>
                <Button
                    colorScheme='twitter'
                    leftIcon={<FaTwitter />}
                    onClick={ () => handleClick('twitter') }
                >
                    Twitter
                </Button>
            </Stack>
            {popup.open ? (
                <NewWindow
                    url={ `/login/sign-in?oauthProvider=${ popup.provider }` }
                    onUnload={() => {
                        setPopUp({ open: false, provider: '' })
                    }}
                />
            ) : null}
        </ModalWidget>
    )

};

export default LoginModal;
