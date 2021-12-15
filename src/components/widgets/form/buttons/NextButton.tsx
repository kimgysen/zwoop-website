import React, {FC} from "react";
import {Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";


interface INextButton {
    href: string
}

const NextButton: FC<INextButton> = ({ href }) => {
    return (
        <Button
            bg={'blue.400'}
            rounded={'full'}
            color={'white'}
            _hover={{ bg: 'blue.500' }}>
            <Link to={ href }>Next</Link>
        </Button>
    )
}

export default NextButton