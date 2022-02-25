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
import Bidding from "@models/db/entity/Bidding";
import Post from "@models/db/entity/Post";


interface AcceptBiddingModalProps {
    isOpen: boolean,
    onClose: () => void,
    post: Post,
    biddingItem: Bidding,
    createDeal: (biddingId: string) => void,
    createDealResult: ApiResult<boolean>
}

const CreateDealModal: FC<AcceptBiddingModalProps> =
    ({ isOpen, onClose, post, biddingItem, createDeal, createDealResult }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Accept bidding</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to assign the your request to
                    { biddingItem?.consultant?.nickName } @{ biddingItem?.askPrice }?
                </ModalBody>

                <ModalFooter>
                    <VStack align='right'>
                        {
                            createDealResult.loading &&
                            <Button
                                disabled
                                isLoading
                                colorScheme='blue'
                                variant='outline'
                                w='80px'
                            />
                        }
                        {
                            !createDealResult.loading &&
                            <Button
                                colorScheme='blue'
                                onClick={ () => createDeal(biddingItem?.biddingId) }
                                w='80px'
                            >
                                Yes
                            </Button>
                        }
                        {
                            createDealResult.success &&
                            <Box color='green'>Success</Box>
                        }
                        {
                            createDealResult.error &&
                            <Box color='red'>{ createDealResult.error }</Box>
                        }
                    </VStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreateDealModal;
