import {Box, Divider, Flex, Heading, Icon, IconButton, Image, useDisclosure, VStack} from '@chakra-ui/react';
import User from "@models/user/User";
import Card from "@components/layout/components/card/Card";
import React, {useState} from "react";
import ReactTimeago from "react-timeago";
import {FaClock, FaPencilAlt} from 'react-icons/fa';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TagsList from "@components/widgets/tags/TagsList";
import EditAboutModal from "@components/pages/user/edit/EditAboutModal";
import EditNickModal from "@components/pages/user/edit/EditNickModal";
import {HStack} from "@chakra-ui/layout/src/stack";


interface UserCardProps {
    profileUser: User,
    principalId: string
}

const UserCard: React.FC<UserCardProps> = ({ profileUser, principalId }) => {

    const [editUser, setEditUser] = useState<User>(profileUser);
    const { isOpen: isEditNickOpen, onOpen: onEditNickOpen, onClose: onEditNickClose } = useDisclosure();
    const { isOpen: isEditAboutOpen, onOpen: onEditAboutOpen, onClose: onEditAboutClose } = useDisclosure();

    return (
        <Box>
            <Card>
                <VStack align='left'>
                    <Flex direction='row' justifyContent='space-between'>
                        <HStack>
                            <Image
                                w='50px'
                                h='50px'
                                mr='10px'
                                src={ profileUser.profilePic }
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src="/static/images/profile_fallback.jpg";
                                }}
                                alt='profile pic'
                            />
                            <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
                                { editUser.nickName }
                            </Heading>
                        </HStack>
                        {
                            profileUser.userId === principalId && (
                                <IconButton
                                    float='right'
                                    align='top'
                                    colorScheme='teal'
                                    aria-label='Call Segun'
                                    size='xs'
                                    icon={<FaPencilAlt/>}
                                    onClick={ onEditNickOpen }
                                />
                            )
                        }
                    </Flex>
                    <Box
                        pb='10px'
                        fontSize='sm'
                    >
                        <Icon as={FaClock} />
                        <Box as='span' ml={'10px'}>Member since: <ReactTimeago date={ profileUser.createdAt } /></Box>
                    </Box>
                    {
                        profileUser.tags.length > 0 &&
                        <Box
                            pbt={ '10px' }
                        >
                            <TagsList tags={ profileUser.tags } />
                        </Box>
                    }
                    <Divider />
                    <Box>
                        {
                            profileUser.userId === principalId && (
                                <IconButton
                                    float='right'
                                    align='top'
                                    colorScheme='teal'
                                    aria-label='Call Segun'
                                    size='xs'
                                    icon={<FaPencilAlt />}
                                    onClick={ onEditAboutOpen }
                                />
                            )
                        }
                        {
                            editUser.aboutText &&
                                <Box className='markdown-body'>
                                    <ReactMarkdown remarkPlugins={ [remarkGfm] }>{ editUser.aboutText }</ReactMarkdown>
                                </Box>
                        }
                        {
                            !editUser.aboutText &&
                                <i>Write something about yourself</i>
                        }
                    </Box>
                </VStack>
            </Card>
            <EditNickModal
                userId={ principalId }
                setCurrentUser={ setEditUser }
                isOpen={ isEditNickOpen }
                onClose={ onEditNickClose }
                nickName={ profileUser.nickName as string }
            />
            <EditAboutModal
                userId={ principalId }
                setCurrentUser={ setEditUser }
                isOpen={ isEditAboutOpen }
                onClose={ onEditAboutClose }
                aboutText={ profileUser.aboutText }
            />
        </Box>
    );
}

export default UserCard;
