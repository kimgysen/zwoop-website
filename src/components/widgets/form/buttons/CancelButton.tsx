import React, {FC} from "react";
import {Button} from "@chakra-ui/react";


interface ICancelButton {
    onCancel: (e: React.MouseEvent) => void
}

const CancelButton: FC<ICancelButton> = ({ onCancel }) => {
    return (
        <Button
            bg={'red.400'}
            mr={3}
            color={'white'}
            _hover={{ bg: 'red.500' }}
            onClick={ e => onCancel(e) }>
            Cancel
        </Button>
    )
}

export default CancelButton