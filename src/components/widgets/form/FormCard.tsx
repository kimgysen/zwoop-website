import {Box} from "@chakra-ui/react";
import React, {FC, ReactNode} from "react";


interface FormCardProps {
    title: string,
    description?: ReactNode
}

const FormCard: FC<FormCardProps> = ({ title, description, children }) =>
    <Box>
        <h2>{ title }</h2>
        <Box mt={ 2 }>
            <Box fontSize="xs"  mb={ 2 }>{ description }</Box>
            { children }
        </Box>
    </Box>

export default FormCard;
