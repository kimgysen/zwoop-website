import {Box, Container, Stack, useColorModeValue,} from '@chakra-ui/react';
import * as React from "react";
import {LinkGrid} from "@components/layout/footer/fragments/LinkGrid";


const Footer: React.FC = () => {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container as={Stack} maxW={'6xl'} py={10}>
                <LinkGrid />
            </Container>
        </Box>
    )
}

export default Footer;