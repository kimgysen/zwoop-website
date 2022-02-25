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
import Post from "@models/db/entity/Post";

interface AddBidViewProps {
    post: Post,
    onSaveBidding: (askPrice: string, currencyCode: string) => void
}

const AddBiddingView: FC<AddBidViewProps> = ({ post, onSaveBidding }) => {

    const [bidPrice, setBidPrice] = useState<string>(post?.bidPrice);

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
                        defaultValue={ post?.bidPrice }
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
                    onSave = { () => onSaveBidding(bidPrice, post?.currency?.currencyCode) }
                    shouldDisableSave={ false }
                    saveError={ '' }
                />
            </Flex >
        </FormCard>
    )
}

export default AddBiddingView;
