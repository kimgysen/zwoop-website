import React, {FC} from "react";
import Currency from "@models/post/Currency";
import {Center, VStack} from "@chakra-ui/react";

interface BnbBoxSmProps {
    price: string,
    currency: Currency
}

const BnbBoxSm: FC<BnbBoxSmProps> = ({ price, currency }) => {
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
                { currency?.currency }
            </Center>
        </VStack>
    )
}

export default BnbBoxSm;