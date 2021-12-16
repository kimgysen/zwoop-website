import {Container, Box} from "@chakra-ui/react";
import React from "react";
import Navbar from "@components/layout/navbar/Navbar";
import Footer from "@components/layout/footer/Footer";


const AppLayout: React.FC = ({ children }) => {
    return (
        <Box bg="#ced7e2">
            <Navbar />
            <Container
                margin={ 'auto' }
                pt={ '60px' }
                width={{ base: "100%", md: "95%" }}
                maxW={"5xl"}
                minH="80vh"
                h="100%"
            >
                { children }
            `</Container>
            <Footer />
        </Box>
    )
}

export default AppLayout;
