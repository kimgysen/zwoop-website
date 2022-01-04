import {Avatar, Box, Button, Flex, Heading, Stack, Text, useColorModeValue,} from '@chakra-ui/react';
import User from "@models/User";


interface UserCardProps {
    user: User
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <Box
            maxW={'270px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}>
            <Box
                h={'80px'}
                w={'full'}
                background={'white'}
            />
            <Flex justify={'center'} mt={-12}>
                <Avatar
                    size={'xl'}
                    src={
                        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                    }
                    alt={'Author'}
                    css={{
                        border: '2px solid white',
                    }}
                />
            </Flex>

            <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                    <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                        John Doe
                    </Heading>
                    <Text color={'gray.500'}>Frontend Developer</Text>
                </Stack>

                <Stack direction={'row'} justify={'center'} spacing={6}>
                    <Stack spacing={0} align={'center'}>
                        <Text fontWeight={600}>15</Text>
                        <Text fontSize={'sm'} color={'gray.500'}>
                            Answered
                        </Text>
                    </Stack>
                    <Stack spacing={0} align={'center'}>
                        <Text fontWeight={600}>15</Text>
                        <Text fontSize={'sm'} color={'gray.500'}>
                            Recommended
                        </Text>
                    </Stack>
                </Stack>

                <Button
                    w={'full'}
                    mt={8}
                    bg={useColorModeValue('#151f21', 'gray.900')}
                    color={'white'}
                    rounded={'md'}
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    }}>
                    Message
                </Button>
            </Box>
        </Box>
    );
}

export default UserCard;
