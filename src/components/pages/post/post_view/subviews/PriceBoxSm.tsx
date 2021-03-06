import React, {FC} from "react";
import {Center, VStack} from "@chakra-ui/react";

interface PriceBoxSmProps {
    price: string,
    currencyCode: string
}

const PriceBoxSm: FC<PriceBoxSmProps> = ({ price, currencyCode }) => {
    return (
        <VStack>
            <Center
                p={'10px'}
                fontWeight={ 600 }
                bgColor="ruby.600"
                color="white"
            >
                <b>{ price }</b>
            </Center>
            <Center
                h={ 15 }
                fontSize={ 'xs' }
                fontWeight={ 600 }
                color="ruby.600"
            >
                { currencyCode }
            </Center>
        </VStack>
    )
}

export default PriceBoxSm;