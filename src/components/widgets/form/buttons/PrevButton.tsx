import React, {FC} from "react";
import {Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";


interface IPrevButton {
    href: string
}

const PrevButton: FC<IPrevButton> = ({ href }) => {
    return (
        <Button
            bg={'blue.400'}
            mr={1}
            rounded={'full'}
            color={'white'}
            _hover={{ bg: 'blue.500' }}>
            <Link to={ href }>Prev</Link>
        </Button>
    )
}

export default PrevButton