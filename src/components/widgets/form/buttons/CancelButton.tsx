import React, {FC} from "react";
import {Button} from "@chakra-ui/react";


interface ICancelButton {
    onCancel: (e: React.MouseEvent) => void,
    size?: string
}

const CancelButton: FC<ICancelButton> = ({ onCancel, size }) => {
    return (
        <Button
            bg={'red.400'}
            color={'white'}
            _hover={{ bg: 'red.500' }}
            onClick={ e => onCancel(e) }
            size={ size || 'md' }
        >
            Cancel
        </Button>
    )
}

export default CancelButton