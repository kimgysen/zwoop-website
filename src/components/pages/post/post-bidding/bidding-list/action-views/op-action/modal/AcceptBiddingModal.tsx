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
    acceptBidding: (postId: string, biddingId: string) => void,
    acceptResult: ApiResult<boolean>
}

const AcceptBiddingModal: FC<AcceptBiddingModalProps> =
    ({ isOpen, onClose, post, biddingItem, acceptBidding, acceptResult }) => {

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
                                onClick={ () => acceptBidding(post?.postId, biddingItem?.biddingId) }
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
