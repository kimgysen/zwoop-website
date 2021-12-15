import {Box} from "@chakra-ui/react";
import React, {FC, ReactNode} from "react";
import Card from "../../layout/components/card/Card";


interface IFormCard {
    title: string,
    description?: ReactNode
}

const FormCard: FC<IFormCard> = ({ title, description, children }) =>
    <Card>
        <h2>{ title }</h2>
        <Box mt={ 2 }>
            <Box fontSize="xs"  mb={ 2 }>{ description }</Box>
            { children }
        </Box>
    </Card>

export default FormCard;
