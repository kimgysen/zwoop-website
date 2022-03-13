import React, {FC, useState} from "react";
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
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    VStack
} from "@chakra-ui/react";
import ApiResult from "@api_clients/type/ApiResult";
import BiddingDto from "@models/dto/domain-client-dto/bidding/BiddingDto";


interface EditNickModalProps {
    defaultAskPrice: string,
    isOpen: boolean,
    onClose: () => void,
    updateBidding: (askPrice: string) => void,
    updateResult: ApiResult<BiddingDto>
}

const EditAskPriceModal: FC<EditNickModalProps> =
    ({ defaultAskPrice, isOpen, onClose, updateBidding, updateResult }) => {

    const [askPrice, setAskPrice] = useState<string>(defaultAskPrice);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update ask price</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <NumberInput
                        size='md'
                        maxW="32"
                        defaultValue={ defaultAskPrice }
                        inputMode='decimal'
                        precision={ 2 }
                        step={ .01 }
                        min={ .01 }
                        onChange={ (valueString: string) => setAskPrice(valueString) }
                        value={ askPrice }
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
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
                                onClick={ () => updateBidding(askPrice) }
                                isDisabled={ !askPrice }
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

export default EditAskPriceModal;
