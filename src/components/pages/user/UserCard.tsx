import {Box, Divider, Heading, HStack, Icon, Image, VStack} from '@chakra-ui/react';
import User from "@models/User";
import Card from "@components/layout/components/card/Card";
import React from "react";
import ReactTimeago from "react-timeago";
import {FaClock} from 'react-icons/fa';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


interface UserCardProps {
    user: User
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    console.log(user);
    return (
        <Box>
            <Card>
                <VStack align='left'>
                    <HStack>
                        <Image
                            w='50px'
                            h='50px'
                            mr='10px'
                            src={ user.profilePic }
                            alt='profile pic'
                        />
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            { user.nickName }
                        </Heading>
                    </HStack>
                    <Box fontSize='sm'>
                        <Icon as={FaClock} />
                        <Box as='span' ml={'10px'}>Member since: <ReactTimeago date={ user.createdAt } /></Box>
                    </Box>
                    <Divider />
                    <Box p={'10px'}>
                        {
                            user.about &&
                                <ReactMarkdown remarkPlugins={ [remarkGfm] }>{ user.about }</ReactMarkdown>
                        }
                        {
                            !user.about &&
                                <i>Write something about yourself</i>
                        }
                    </Box>
                </VStack>
            </Card>
        </Box>
    );
}

export default UserCard;
