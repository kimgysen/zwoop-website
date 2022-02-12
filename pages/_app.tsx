import React from 'react';

import type {AppProps} from 'next/app';
import "@styles/global.css";
import '@styles/markdown.css';

import {ColorModeScript} from "@chakra-ui/react";
import theme from "../src/theme/theme";
import CSSReset from "@chakra-ui/css-reset/src/css-reset";
import {ChakraProvider} from "@chakra-ui/provider";
import {SessionProvider} from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <React.StrictMode>
            <CSSReset />
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <SessionProvider session={pageProps.session} >
                <ChakraProvider theme={theme}>
                    <Component {...pageProps} />
                </ChakraProvider>
            </SessionProvider>
        </React.StrictMode>
    )
}

export default MyApp;
