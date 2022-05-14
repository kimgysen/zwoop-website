import React from "react";
import {Button, Container, Flex, Heading, Stack, Text} from "@chakra-ui/react";
import {Illustration} from "@components/pages/login/illustration";


const Hero: React.FC = () => {
    return (
        <Container
            maxW={'5xl'}
            bg='white'
        >
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                    Code {' '}
                    <Text as={'span'} color={'orange.400'}>
                        Support
                    </Text>
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                    Ask experienced developers to help you with your software problem in exchange for BUSD.
                </Text>
                <Stack spacing={6} direction={'row'}>
                    <Button
                        rounded={'full'}
                        px={6}
                        colorScheme={'orange'}
                        bg={'orange.400'}
                        _hover={{ bg: 'orange.500' }}>
                        Get started
                    </Button>
                    <Button rounded={'full'} px={6}>
                        Learn more
                    </Button>
                </Stack>
                <Flex w={'full'}>
                    <Illustration
                        height={{ sm: '24rem', lg: '28rem' }}
                        mt={{ base: 12, sm: 16 }}
                    />
                </Flex>
            </Stack>
        </Container>
    )
}

export default Hero;
