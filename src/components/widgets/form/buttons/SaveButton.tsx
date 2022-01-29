import React, {FC} from "react";
import {Button, Flex, Spacer} from "@chakra-ui/react";
import {Box} from "@chakra-ui/layout/src/box";


interface ISaveButton {
    onSave: (e: React.MouseEvent) => void,
    shouldDisableSave: boolean,
    saveError?: string | null
}

const SaveButton: FC<ISaveButton> = ({ onSave, shouldDisableSave, saveError }) => {
    return (
        <Box>
            <Flex mt={5} pb={10}>
                <Spacer />
                <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{ bg: 'blue.500' }}
                    onClick={ e => onSave(e) }
                    disabled={ shouldDisableSave }
                >
                    Publish
                </Button>
            </Flex>
            <Flex pb={10}>
                <Spacer />
                {
                    saveError &&
                    <Box color='red'>
                        { saveError }
                    </Box>
                }
            </Flex>
        </Box>

    )
}

export default SaveButton