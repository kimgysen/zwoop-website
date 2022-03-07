import React, {FC, useState} from "react";
import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from "@chakra-ui/react";
import FormCard from "@components/widgets/form/FormCard";
import {Flex} from "@chakra-ui/layout/src/flex";
import SaveButton from "@components/widgets/form/buttons/SaveButton";
import {Box} from "@chakra-ui/layout/src/box";
import PostDto from "@models/dto/rest/receive/post/PostDto";

interface AddBidViewProps {
    postDto: PostDto,
    onSaveBidding: (askPrice: string, currencyCode: string) => void
}

const AddBiddingView: FC<AddBidViewProps> = ({ postDto, onSaveBidding }) => {

    const [bidPrice, setBidPrice] = useState<string>(postDto?.bidPrice);

    return (
        <FormCard
            title='Can you help?'
            description='How much do you ask?'>
            <Flex
                direction='row'
                alignItems='flex-start'
            >
                <Box mr='10px'>
                    <NumberInput
                        size='md'
                        maxW="32"
                        defaultValue={ postDto?.bidPrice }
                        inputMode='decimal'
                        precision={ 2 }
                        step={ .01 }
                        min={ .01 }
                        onChange={(valueString: string) => setBidPrice(valueString)}
                        value={bidPrice}
                        background='white'
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Box>
                <SaveButton
                    label='Submit'
                    onSave = { () => onSaveBidding(bidPrice, postDto?.currencyCode) }
                    shouldDisableSave={ false }
                    saveError={ '' }
                />
            </Flex >
        </FormCard>
    )
}

export default AddBiddingView;
