import {FC} from "react";
import {Center, Image, keyframes, usePrefersReducedMotion, VStack} from "@chakra-ui/react";
import millify from "millify";


export interface TrxBoxProps {
    price: number
}

export const TrxBox: FC<TrxBoxProps> = ({ price }) => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const spin = keyframes`
      from { transform: rotate(0deg); }
      to { transform: rotateY(360deg); }
    `
    const animation = prefersReducedMotion
        ? undefined
        : `${spin} infinite 4s linear`

    return (
        <VStack
            h={ '100px' }
            w={ '75px' }
            align="stretch"
        >
            <Center
                h={ 40 }
                fontWeight={ 600 }
                bgColor="ruby.600"
                color="white"
            >
                { millify(price) }
            </Center>
            <Center
                h={ 15 }
                fontSize={ 'xs' }
                fontWeight={ 600 }
                color="ruby.600"
            >
                TRX
            </Center>
            <Center
                h={ 40 }
            >
                <Image
                    animation={ animation }
                    src='/static/images/trx-logo.svg'
                    w={ 30 }
                    h={ 30 }
                    alt="trx-logo"
                    color="ruby.600"
                />
            </Center>
        </VStack>
    );
}
