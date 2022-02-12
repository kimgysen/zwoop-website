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

interface DeleteBiddingModalProps {
    isOpen: boolean,
    onClose: () => void,
    deleteBidding: () => void,
    deleteResult: ApiResult<boolean>
}

const DeleteBiddingModal: FC<DeleteBiddingModalProps> = ({ isOpen, onClose, deleteBidding, deleteResult }) => {

    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
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
                            deleteResult.loading &&
                            <Button
                                disabled
                                isLoading
                                colorScheme='blue'
                                variant='outline'
                                w='80px'
                            />
                        }
                        {
                            !deleteResult.loading &&
                            <Button
                                colorScheme='blue'
                                onClick={ deleteBidding }
                                w='80px'
                            >
                                Yes
                            </Button>
                        }
                        {
                            deleteResult.success &&
                            <Box color='green'>Success</Box>
                        }
                        {
                            deleteResult.error &&
                            <Box color='red'>{ deleteResult.error }</Box>
                        }
                    </VStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteBiddingModal;
