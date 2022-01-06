import {Box, Divider, Heading, HStack, Icon, IconButton, Image, useDisclosure, VStack} from '@chakra-ui/react';
import User from "@models/User";
import Card from "@components/layout/components/card/Card";
import React, {useState} from "react";
import ReactTimeago from "react-timeago";
import {FaClock, FaPencilAlt} from 'react-icons/fa';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TagsList from "@components/widgets/tags/TagsList";
import EditAboutModal from "@components/pages/user/edit/EditAboutModal";
import EditNickModal from "@components/pages/user/edit/EditNickModal";


interface UserCardProps {
    user: User,
    loggedInUserId: string
}

const UserCard: React.FC<UserCardProps> = ({ user, loggedInUserId }) => {

    const [currentUser, setCurrentUser] = useState<User>(user);
    const { isOpen: isEditNickOpen, onOpen: onEditNickOpen, onClose: onEditNickClose } = useDisclosure();
    const { isOpen: isEditAboutOpen, onOpen: onEditAboutOpen, onClose: onEditAboutClose } = useDisclosure();

    return (
        <Box>
            <Card>
                <VStack align='left'>
                    <HStack align='top'>
                        <Image
                            w='50px'
                            h='50px'
                            mr='10px'
                            src={ user.profilePic }
                            alt='profile pic'
                        />
                        <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
                            { currentUser.nickName }
                        </Heading>
                        {
                            user.userId === loggedInUserId && (
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
                    </HStack>
                    <Box
                        pb='10px'
                        fontSize='sm'
                    >
                        <Icon as={FaClock} />
                        <Box as='span' ml={'10px'}>Member since: <ReactTimeago date={ user.createdAt } /></Box>
                    </Box>
                    {
                        user.tags.length > 0 &&
                        <Box
                            pbt={ '10px' }
                        >
                            <TagsList tags={ user.tags } />
                        </Box>
                    }
                    <Divider />
                    <Box>
                        {
                            currentUser.aboutText &&
                                <Box className='markdown-body'>
                                    <ReactMarkdown remarkPlugins={ [remarkGfm] }>{ currentUser.aboutText }</ReactMarkdown>
                                </Box>
                        }
                        {
                            !currentUser.aboutText &&
                                <i>Write something about yourself</i>
                        }
                        {
                            user.userId === loggedInUserId && (
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
                    </Box>
                </VStack>
            </Card>
            <EditNickModal
                userId={ user.userId }
                setCurrentUser={ setCurrentUser }
                isOpen={ isEditNickOpen }
                onClose={ onEditNickClose }
                nickName={ user.nickName as string }
            />
            <EditAboutModal
                userId={ user.userId }
                setCurrentUser={ setCurrentUser }
                isOpen={ isEditAboutOpen }
                onClose={ onEditAboutClose }
                aboutText={ user.aboutText }
            />
        </Box>
    );
}

export default UserCard;
