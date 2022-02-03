import React, {FC} from "react";
import {HStack} from "@chakra-ui/react";
import styles from './PartnerTypingBox.module.css';
import {FaPen} from 'react-icons/fa';


const PartnerTypingBox: FC = () => {
    return (
        <HStack
            fontSize='sm'
            color='gray.600'
            mt='5px'
            className={styles.loading}
        >
            <FaPen />
            <i>Writing</i>
        </HStack>

    )
}
export default PartnerTypingBox;
