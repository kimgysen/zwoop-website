import {Box, Container} from "@chakra-ui/react";
import React from "react";
import Navbar from "@components/layout/navbar/Navbar";
import Footer from "@components/layout/footer/Footer";
import 'github-markdown-css';
import "react-toastify/dist/ReactToastify.css"
import AuthState from "@models/auth/AuthState";


interface AppLayoutProps {
    authState: AuthState
}

const AppLayout: React.FC<AppLayoutProps> = (
    { authState, children}) => {
    return (
        <Box bg="#ced7e2">
            <Navbar
                authState={ authState }
            />
            <Container
                margin={ 'auto' }
                pt={ '60px' }
                width={{ base: "100%", md: "95%" }}
                maxW={"6xl"}
                minH="100vh"
                h="100%"
            >
                { children }
            `</Container>
            <Footer />
        </Box>
    )
}

export default AppLayout;
