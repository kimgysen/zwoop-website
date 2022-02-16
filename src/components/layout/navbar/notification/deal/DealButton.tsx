import {FC} from "react";
import {css} from '@emotion/react';
import {Circle, IconButton} from "@chakra-ui/react";
import {FaHandshake} from "react-icons/fa";


interface HandshakeButtonProps {

}

const DealButton: FC<HandshakeButtonProps> = () => {
    return (
        <IconButton
            css={css`position: relative !important;`}
            py={'2'}
            aria-label={'Notifications'}
            size={'lg'}
            background='white'
            icon={<>
                <FaHandshake
                    color={'gray.750'}
                />
                <Circle as={'span'}
                        size='20px'
                        color={'white'}
                        position={'absolute'}
                        bottom={'4px'}
                        right={'4px'}
                        fontSize={'0.8rem'}
                        bgColor={'red'}
                        zIndex={9999} p={'1px'}>
                    1
                </Circle>
            </>}
        />
    )
}

export default DealButton;
