import {Box, Link, SimpleGrid, Stack, Text, useColorModeValue} from '@chakra-ui/react';
import * as React from 'react';
import {FaGithub, FaLinkedin, FaYoutube} from 'react-icons/fa';
import {ListHeader} from "@components/layout/footer/fragments/ListHeader";
import {SocialButton} from "@components/layout/footer/fragments/SocialButton";
import {FooterLogo} from "@components/layout/footer/fragments/FooterLogo";


export const LinkGrid: React.FC = () => (
    <SimpleGrid
        templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
        spacing={8}>
        <Stack spacing={6}>
            <Box>
                <FooterLogo color={useColorModeValue('gray.700', 'white')} />
            </Box>
            <Text fontSize={'sm'}>
                &copy; {new Date().getFullYear()} Zwoop. All rights reserved.
            </Text>
            <Stack direction={'row'} spacing={6}>
                <SocialButton label={'LinkedIn'} href={'#'}>
                    <FaLinkedin />
                </SocialButton>
                <SocialButton label={'Github'} href={'#'}>
                    <FaGithub />
                </SocialButton>
                <SocialButton label={'YouTube'} href={'#'}>
                    <FaYoutube />
                </SocialButton>
            </Stack>
        </Stack>
        <Stack align={'flex-start'}>
            <ListHeader>Product</ListHeader>
            <Link href={'#'}>How it works</Link>
            <Link href={'#'}>FAQ</Link>
            <Link href={'#'}>Technical docs</Link>
        </Stack>
        <Stack align={'flex-start'}>
            <ListHeader>Tutorials</ListHeader>
            <Link href={'#'}>Install Metamask</Link>
            <Link href={'#'}>Transfer BUSD</Link>
            <Link href={'#'}>MS Teams</Link>
            <Link href={'#'}>Zoom</Link>
        </Stack>
        <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Link href={'#'}>About us</Link>
            <Link href={'#'}>Contact us</Link>
        </Stack>
        <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link href={'#'}>Help Center</Link>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Legal</Link>
            <Link href={'#'}>Privacy Policy</Link>
        </Stack>
    </SimpleGrid>
);