import React, {FC} from "react";
import {Button, Flex, Spacer} from "@chakra-ui/react";
import {Box} from "@chakra-ui/layout/src/box";


interface SaveButtonProps {
    label: string,
    onSave: (e: React.MouseEvent) => void,
    shouldDisableSave: boolean,
    saveError?: string | null
}

const SaveButton: FC<SaveButtonProps> = ({ label, onSave, shouldDisableSave, saveError }) => {
    return (
        <Box>
            <Flex>
                <Spacer />
                <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{ bg: 'blue.500' }}
                    onClick={ e => onSave(e) }
                    disabled={ shouldDisableSave }
                >
                    { label }
                </Button>
            </Flex>
            <Flex>
                <Spacer />
                {
                    saveError &&
                    <Box
                        color='red'
                        pb={10}
                    >
                        { saveError }
                    </Box>
                }
            </Flex>
        </Box>

    )
}

export default SaveButton