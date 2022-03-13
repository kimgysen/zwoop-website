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
import AnswerDto from "@models/dto/domain-client-dto/answer/AnswerDto";
import {acceptAnswerApi} from "@api_clients/feature/answer/AnswerApiClient";
import {dispatchCustomMessage} from "../../../../../../../../service/stomp/subscriptions/SubscriptionUtil";
import {POST_STEPPER__ANSWER_ACCEPTED} from "../../../../../../../../event_dispatchers/config/StompEvents";


interface AcceptAnswerModalProps {
    answerDto: AnswerDto,
    isOpen: boolean,
    onClose: () => void
}

const AcceptAnswerModalHoc: FC<AcceptAnswerModalProps> =
    ({ answerDto, isOpen, onClose }) => {

        const defaultResult = { loading: false, success: null, error: null };
        const [acceptRes, setAcceptRes] = useState<ApiResult<boolean>>(defaultResult);

        useEffect(() => {
            if (acceptRes.success) {
                onClose();
            }
        }, [acceptRes?.success]);

        const onAccept = async (answerId: string) => {
            const res = await acceptAnswerApi(answerId);

            if (res?.success) {
                onClose();
                dispatchCustomMessage(POST_STEPPER__ANSWER_ACCEPTED, answerDto);
            }

        }

        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Accept answer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to accept the answer?<br />
                        This will trigger to smart contract to pay out the consultant.<br />
                        You cannot undo this action.
                    </ModalBody>
                    <ModalFooter>
                        <VStack align='right'>
                            {
                                acceptRes.loading &&
                                <Button
                                    disabled
                                    isLoading
                                    colorScheme='green'
                                    variant='outline'
                                    w='80px'
                                />
                            }
                            {
                                !acceptRes.loading &&
                                <Button
                                    colorScheme='green'
                                    onClick={ () => onAccept(answerDto?.answerId) }
                                    w='80px'
                                >
                                    Yes
                                </Button>
                            }
                            {
                                acceptRes.error &&
                                <Box color='red'>{ acceptRes.error }</Box>
                            }
                        </VStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

export default AcceptAnswerModalHoc;
