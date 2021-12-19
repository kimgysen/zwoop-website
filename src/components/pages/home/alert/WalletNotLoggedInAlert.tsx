import React from "react";
import {Alert, AlertIcon, AlertTitle, Box} from "@chakra-ui/react";

const WalletNotLoggedInAlert: React.FC = () => {

    return (
        <Alert status='warning'>
            <AlertIcon />
            <Box flex='1'>
                <AlertTitle>Tronlink not logged in</AlertTitle>
            </Box>
        </Alert>
    )
}

export default WalletNotLoggedInAlert;
