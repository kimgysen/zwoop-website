import {Alert, AlertIcon, AlertTitle, Box} from "@chakra-ui/react";
import React from "react";


const WalletInstalledAlert: React.FC = () => {

    return (
        <Alert status='success'>
            <AlertIcon />
            <Box>
                <AlertTitle width='auto' >Tronlink</AlertTitle>
            </Box>
        </Alert>
    )

}

export default WalletInstalledAlert;