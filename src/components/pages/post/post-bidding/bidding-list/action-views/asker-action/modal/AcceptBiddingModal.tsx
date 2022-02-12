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


interface AcceptBiddingModalProps {
    isOpen: boolean,
    onClose: () => void,
    acceptBidding: () => void,
    acceptResult: ApiResult<boolean>
}

const AcceptBiddingModal: FC<AcceptBiddingModalProps> = ({ isOpen, onClose, acceptBidding, acceptResult }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cancel bidding</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to cancel your bidding?
                </ModalBody>

                <ModalFooter>
                    <VStack align='right'>
                        {
                            acceptResult.loading &&
                            <Button
                                disabled
                                isLoading
                                colorScheme='blue'
                                variant='outline'
                                w='80px'
                            />
                        }
                        {
                            !acceptResult.loading &&
                            <Button
                                colorScheme='blue'
                                onClick={ acceptBidding }
                                w='80px'
                            >
                                Yes
                            </Button>
                        }
                        {
                            acceptResult.success &&
                            <Box color='green'>Success</Box>
                        }
                        {
                            acceptResult.error &&
                            <Box color='red'>{ acceptResult.error }</Box>
                        }
                    </VStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AcceptBiddingModal;
