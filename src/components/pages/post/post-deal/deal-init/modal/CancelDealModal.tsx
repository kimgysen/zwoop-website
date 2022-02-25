import React, {FC} from "react";
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


interface CancelDealModalProps {
    isOpen: boolean,
    onClose: () => void,
    dealId: string,
    cancelDeal: (dealId: string) => void,
    cancelDealResult: ApiResult<boolean>
}

const CancelDealModal: FC<CancelDealModalProps> =
    ({ isOpen, onClose, dealId, cancelDeal, cancelDealResult }) => {

        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cancel deal</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to cancel the deal?
                    </ModalBody>
                    <ModalFooter>
                        <VStack align='right'>
                            {
                                cancelDealResult.loading &&
                                <Button
                                    disabled
                                    isLoading
                                    colorScheme='blue'
                                    variant='outline'
                                    w='80px'
                                />
                            }
                            {
                                !cancelDealResult.loading &&
                                <Button
                                    colorScheme='blue'
                                    onClick={ () => cancelDeal(dealId) }
                                    w='80px'
                                >
                                    Yes
                                </Button>
                            }
                            {
                                cancelDealResult.success &&
                                <Box color='green'>Success</Box>
                            }
                            {
                                cancelDealResult.error &&
                                <Box color='red'>{ cancelDealResult.error }</Box>
                            }
                        </VStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

export default CancelDealModal;
