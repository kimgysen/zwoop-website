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
import BiddingDto from "@models/dto/domain-client-dto/bidding/BiddingDto";
import DealDto from "@models/dto/domain-client-dto/deal/DealDto";


interface AcceptBiddingModalProps {
    isOpen: boolean,
    onClose: () => void,
    biddingDto: BiddingDto,
    createDeal: (biddingId: string) => void,
    createDealResult: ApiResult<DealDto>
}

const CreateDealModal: FC<AcceptBiddingModalProps> =
    ({ isOpen, onClose, biddingDto, createDeal, createDealResult }) => {

        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Accept bidding</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to assign the your request to
                        { biddingDto?.consultant?.nickName } @{ biddingDto?.askPrice }?
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
                                    onClick={ () => createDeal(biddingDto?.biddingId) }
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
