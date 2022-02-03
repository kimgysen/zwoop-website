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

interface AddBidViewProps {
    defaultBidPrice: string
}

const AddBidView: FC<AddBidViewProps> = ({ defaultBidPrice }) => {

    const [bidPrice, setBidPrice] = useState<string>(defaultBidPrice);

    return (
        <FormCard
            title=''
            description='Do you accept the bid or do you want to change it?'>
            <Flex
                direction='row'
                spacing={ 4 }
                alignItems='flex-start'
            >
                <Box mr='10px'>
                    <NumberInput
                        size='md'
                        maxW="32"
                        defaultValue={ defaultBidPrice }
                        inputMode='decimal'
                        precision={ 2 }
                        step={ .01 }
                        min={ .01 }
                        onChange={(valueString: string) => setBidPrice(valueString)}
                        value={bidPrice}
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
                    onSave = { () => {} }
                    shouldDisableSave={ false }
                    saveError={ '' }
                />
            </Flex >
        </FormCard>
    )
}

export default AddBidView;
