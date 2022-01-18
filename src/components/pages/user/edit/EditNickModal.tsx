import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {
    Box,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack
} from "@chakra-ui/react";
import {updateNickName} from "@apiclients/feature/user/UserService";
import {getRawJwt} from "../../../../service/jwt/JwtService";
import ApiResult from "@apiclients/type/ApiResult";
import User from "@models/user/User";


interface EditNickModalProps {
    userId: string,
    setCurrentUser: Dispatch<SetStateAction<User>>,
    isOpen: boolean,
    onClose: () => void,
    nickName: string
}

const EditNickModal: FC<EditNickModalProps> = ({ userId, setCurrentUser, nickName, isOpen, onClose }) => {

    const defaultUpdateResult = { loading: false, success: null, error: null };

    const [updatedNick, setUpdatedNick] = useState<string>(nickName);
    const [updateResult, setUpdateResult] = useState<ApiResult>(defaultUpdateResult);

    const handleChange = (e: any) => {
        setUpdateResult(defaultUpdateResult)
        setUpdatedNick(e.target.value);
    }

    const onSave = async () => {
        setUpdateResult({ ...updateResult, loading: true })
        const jwt = await getRawJwt();
        const res = await updateNickName(userId, updatedNick as string, jwt);

        if (res.success) {
            setCurrentUser(res.success);
        }

        setUpdateResult(res);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update nickname</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input
                        autoFocus
                        onChange={ handleChange }
                        onFocus={ e =>  e.target.select() }
                        variant='outline'
                        placeholder='nickName'
                        defaultValue={ nickName }
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
                                isDisabled={ updatedNick === '' }
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

export default EditNickModal;
