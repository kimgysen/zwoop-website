import {Box, Container} from "@chakra-ui/react";
import React from "react";
import Navbar from "@components/layout/navbar/Navbar";
import Footer from "@components/layout/footer/Footer";
import 'github-markdown-css';
import "react-toastify/dist/ReactToastify.css"


const AppLayout: React.FC = (
    { children}) => {

    return (
        <Box bg="#ced7e2">
            <Navbar />
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
