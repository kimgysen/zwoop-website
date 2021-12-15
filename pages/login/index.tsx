import {NextPage} from "next";
import Head from "next/head";
import React, {useEffect} from "react";
import {
    Container,
    Box
} from '@chakra-ui/react';
import Navbar from "@components/layout/navbar/Navbar";
import Hero from "@components/pages/login/Hero";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";


const Login: NextPage = () => {

    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push('/');
        }
    }, [session]);


    return (
        <>
            <Head>
                <title>Register / Login</title>
            </Head>
            <Navbar />
            <Box h='100vh'>
                <Hero />
            </Box>
            <Box h='100vh' pt='50px'>
                Test second page
            </Box>
        </>
    )
}

export default Login;
