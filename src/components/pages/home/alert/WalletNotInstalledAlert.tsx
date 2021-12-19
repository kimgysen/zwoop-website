import React from "react";
import {Alert, AlertDescription, AlertIcon, AlertTitle, Box} from "@chakra-ui/react";

const WalletNotInstalledAlert: React.FC = () => {

    return (
        <Alert status='warning'>
            <AlertIcon />
            <Box flex='1'>
                <AlertTitle>Tronlink not installed</AlertTitle>
                <AlertDescription display='block'>
                    Please download the Tronlink TRX wallet for Chrome and Firefox.
                </AlertDescription>
            </Box>
        </Alert>
    )
}

export default WalletNotInstalledAlert;
