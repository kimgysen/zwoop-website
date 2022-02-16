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


interface UnAcceptBiddingModalProps {
    isOpen: boolean,
    onClose: () => void,
    postId: string,
    biddingId: string,
    unAcceptBidding: (postId: string, biddingId: string) => void,
    unAcceptResult: ApiResult<boolean>
}

const UnAcceptBiddingModal: FC<UnAcceptBiddingModalProps> =
    ({ isOpen, onClose, postId, biddingId, unAcceptBidding, unAcceptResult }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Accept bidding</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to un-assign your request and re-open the bidding?
                </ModalBody>
                <ModalFooter>
                    <VStack align='right'>
                        {
                            unAcceptResult.loading &&
                            <Button
                                disabled
                                isLoading
                                colorScheme='blue'
                                variant='outline'
                                w='80px'
                            />
                        }
                        {
                            !unAcceptResult.loading &&
                            <Button
                                colorScheme='blue'
                                onClick={ () => unAcceptBidding(postId, biddingId) }
                                w='80px'
                            >
                                Yes
                            </Button>
                        }
                        {
                            unAcceptResult.success &&
                            <Box color='green'>Success</Box>
                        }
                        {
                            unAcceptResult.error &&
                            <Box color='red'>{ unAcceptResult.error }</Box>
                        }
                    </VStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UnAcceptBiddingModal;
