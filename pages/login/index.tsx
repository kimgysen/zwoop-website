import {NextPage} from "next";
import Head from "next/head";
import React, {useEffect} from "react";
import {Box} from '@chakra-ui/react';
import Navbar from "@components/layout/navbar/Navbar";
import Hero from "@components/pages/login/Hero";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import Footer from "@components/layout/footer/Footer";


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
            <Navbar authState={{ isLoggedIn: false }} />
            <Box h='100vh'>
                <Hero />
            </Box>
            <Footer />
        </>
    )
}

export default Login;
