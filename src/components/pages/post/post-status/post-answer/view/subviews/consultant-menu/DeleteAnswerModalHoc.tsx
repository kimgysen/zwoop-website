import React, {FC, useEffect, useState} from "react";
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
import ApiResult from "@api_clients/type/ApiResult";
import {deleteAnswerApi} from "@api_clients/feature/answer/AnswerApiClient";
import AnswerDto from "@models/dto/rest/receive/answer/AnswerDto";


interface DeleteAnswerModalProps {
    answerDto: AnswerDto,
    isOpen: boolean,
    onClose: () => void
}

const DeleteAnswerModalHoc: FC<DeleteAnswerModalProps> =
    ({ answerDto, isOpen, onClose }) => {

        const defaultResult = { loading: false, success: null, error: null };
        const [delRes, setDelRes] = useState<ApiResult<boolean>>(defaultResult);

        useEffect(() => {
            if (delRes.success) {
                onClose();
            }
        }, [delRes?.success]);

        const onDelete = async () => {
            const res = await deleteAnswerApi(answerDto?.answerId);
            setDelRes(res);
        }

        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete answer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete the answer?
                    </ModalBody>
                    <ModalFooter>
                        <VStack align='right'>
                            {
                                delRes.loading &&
                                <Button
                                    disabled
                                    isLoading
                                    colorScheme='blue'
                                    variant='outline'
                                    w='80px'
                                />
                            }
                            {
                                !delRes.loading &&
                                <Button
                                    colorScheme='blue'
                                    onClick={ onDelete }
                                    w='80px'
                                >
                                    Yes
                                </Button>
                            }
                            {
                                delRes.error &&
                                <Box color='red'>{ delRes.error }</Box>
                            }
                        </VStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

export default DeleteAnswerModalHoc;
