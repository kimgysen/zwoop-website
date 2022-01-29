import React, {FC} from "react";
import {HStack} from "@chakra-ui/react";
import {FaEye} from 'react-icons/fa';


const PartnerReadBox: FC = () => {
    return (
        <HStack
            fontSize='sm'
            color='gray.400'
        >
            <FaEye />
            <i>Read</i>
        </HStack>

    )
}

export default PartnerReadBox;
