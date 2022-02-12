import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack
} from "@chakra-ui/react";
import User from "@models/user/User";
import MarkdownEditor from "@components/widgets/markdown/MarkdownEditor";
import ApiResult from "@api_clients/type/ApiResult";
import {updateAbout} from "@api_clients/feature/user/UserService";
import {getRawJwt} from "../../../../service/jwt/JwtService";

interface EditAboutModalProps {
    userId: string,
    setCurrentUser: Dispatch<SetStateAction<User>>,
    isOpen: boolean,
    onClose: () => void,
    aboutText?: string
}

const EditAboutModal: FC<EditAboutModalProps> = ({ userId, setCurrentUser, aboutText, isOpen, onClose }) => {

    const defaultUpdateResult = { loading: false, success: null, error: null };

    const [updatedAbout, setUpdatedAbout] = useState<string>(aboutText as string || '');
    const [updateResult, setUpdateResult] = useState<ApiResult<User>>(defaultUpdateResult);


    const onSave = async () => {
        setUpdateResult({ ...updateResult, loading: true })
        const jwt = await getRawJwt();
        const res = await updateAbout(userId, updatedAbout as string, jwt);

        if (res.success) {
            setCurrentUser(res.success);
        }

        setUpdateResult(res);
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW={{ sm: '90%', md: '50%' }}>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <MarkdownEditor
                        description     = { updatedAbout }
                        setDescription  = { (descriptionMd: string) => setUpdatedAbout(descriptionMd) }
                    />
                </ModalBody>
                <ModalFooter>
                    <VStack align='right'>
                        {
                            updateResult.loading &&
                            <Button
                                disabled
                                isLoading
                                colorScheme='blue'
                                variant='outline'
                                w='80px'
                            />
                        }
                        {
                            !updateResult.loading &&
                            <Button
                                colorScheme='blue'
                                onClick={onSave}
                                w='80px'
                            >
                                Save
                            </Button>
                        }
                        {
                            updateResult.success &&
                            <Box color='green'>Success</Box>
                        }
                        {
                            updateResult.error &&
                            <Box color='red'>{ updateResult.error }</Box>
                        }
                    </VStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default EditAboutModal;
