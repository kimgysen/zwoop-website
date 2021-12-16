import { Container, Box, Link, SimpleGrid, Stack, useColorModeValue, Text } from '@chakra-ui/react';
import * as React from 'react';
import {FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube} from 'react-icons/fa';
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
            <Link href={'#'}>Install Tronlink</Link>
            <Link href={'#'}>Transfer TRX</Link>
            <Link href={'#'}>Freeze TRX</Link>
            <Link href={'#'}>Use MS Teams</Link>
            <Link href={'#'}>Use Zoom</Link>
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