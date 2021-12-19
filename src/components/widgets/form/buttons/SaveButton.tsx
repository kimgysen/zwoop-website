import React, {FC} from "react";
import {Button} from "@chakra-ui/react";


interface ISaveButton {
    onSave: (e: React.MouseEvent) => void
}

const SaveButton: FC<ISaveButton> = ({ onSave }) => {
    return (
        <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{ bg: 'blue.500' }}
            onClick={ e => onSave(e) }
        >
            Save
        </Button>
    )
}

export default SaveButton