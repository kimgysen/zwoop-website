import React from "react";
import WalletNotInstalledAlert from "@components/pages/home/alert/WalletNotInstalledAlert";
import WalletNotLoggedInAlert from "@components/pages/home/alert/WalletNotLoggedInAlert";
import {Box} from "@chakra-ui/layout/src/box";
import WalletInstalledAlert from "@components/pages/home/alert/WalletInstalledAlert";


interface TronlinkBannerProps {
    isInstalled: boolean,
    isLoggedIn: boolean,
    isLoading: boolean
}

const TronlinkBanner: React.FC<TronlinkBannerProps> = ({ isInstalled, isLoggedIn, isLoading }) => {

    return (
        <Box width='auto'>
            {
                !isLoading && !isInstalled &&
                    <WalletNotInstalledAlert />
            }
            {
                !isLoading && isInstalled && !isLoggedIn &&
                    <WalletNotLoggedInAlert />
            }
            {
                !isLoading && isInstalled && isLoggedIn &&
                    <WalletInstalledAlert />
            }
        </Box>
    )
}

export default TronlinkBanner;
