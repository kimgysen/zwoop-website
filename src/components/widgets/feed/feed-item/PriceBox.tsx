import {FC} from "react";
import {Center, Image, keyframes, usePrefersReducedMotion, VStack} from "@chakra-ui/react";


export interface PriceBoxProps {
    price: string
}

export const PriceBox: FC<PriceBoxProps> = ({ price }) => {
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
            w={ '60px' }
            align="stretch"
        >
            <Center
                h={ 40 }
                p={'10px'}
                fontWeight={ 600 }
                bgColor="ruby.600"
                color="white"
            >
                { price }
            </Center>
            <Center
                h={ 15 }
                fontSize={ 'xs' }
                fontWeight={ 600 }
                color="ruby.600"
            >
                BUSD
            </Center>
            <Center
                h={ 40 }
            >
                <Image
                    animation={ animation }
                    src='/static/images/busd-icon.png'
                    w={ 30 }
                    h={ 30 }
                    alt="bnb-logo"
                    color="ruby.600"
                />
            </Center>
        </VStack>
    );
}
