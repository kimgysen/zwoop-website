import {Box, Divider, Flex, Heading, Icon, IconButton, Image, VStack} from '@chakra-ui/react';
import Card from "@components/layout/components/card/Card";
import React, {useState} from "react";
import ReactTimeago from "react-timeago";
import {FaClock, FaPencilAlt} from 'react-icons/fa';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TagsList from "@components/widgets/tags/TagsList";
import EditNick from "@components/pages/user/edit/EditNick";
import EditAbout from "@components/pages/user/edit/EditAbout";
import UserFullDto from "@models/dto/domain-client-dto/user/UserFullDto";


interface UserCardProps {
    profileUser: UserFullDto,
    principalId: string
}

const UserCard: React.FC<UserCardProps> = ({ profileUser, principalId }) => {

    const [editUser, setEditUser] = useState<UserFullDto>(profileUser);

    const [isNickEdit, setNickEdit] = useState<boolean>(false);
    const [isAboutEdit, setAboutEdit] = useState<boolean>(false);

    return (
        <Box>
            <Card>
                <VStack align='left'>
                    <Flex direction='row' justifyContent='space-between'>
                        <Flex>
                            <Image
                                w='50px'
                                h='50px'
                                mr='10px'
                                src={ profileUser.avatar }
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src="/static/images/profile_fallback.jpg";
                                }}
                                alt='profile pic'
                            />
                            {
                                !isNickEdit
                                && (
                                    <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
                                        { editUser.nickName }
                                    </Heading>
                                )
                            }
                            {
                                isNickEdit
                                && (
                                    <EditNick
                                        userId={ editUser?.userId }
                                        nickName={ editUser?.nickName }
                                        setCurrentUser={ setEditUser }
                                        closeEdit={ () => setNickEdit(false) }
                                    />
                                )
                            }
                        </Flex>
                        {
                            profileUser.userId === principalId && (
                                <IconButton
                                    float='right'
                                    variant='outline'
                                    colorScheme='teal'
                                    aria-label='Edit nickname'
                                    size='xs'
                                    icon={<FaPencilAlt/>}
                                    onClick={ () => setNickEdit(!isNickEdit) }
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
                        profileUser?.tags?.length > 0 &&
                        <Box
                            py={ '10px' }
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
                                    colorScheme='teal'
                                    variant='outline'
                                    aria-label='Edit about'
                                    size='xs'
                                    icon={<FaPencilAlt />}
                                    onClick={ () => setAboutEdit(!isAboutEdit) }
                                />
                            )
                        }
                        {
                            !isAboutEdit
                            && !editUser?.aboutText
                            && <i>Write something about yourself</i>
                        }
                        {
                            !isAboutEdit
                            && editUser?.aboutText
                            && (
                                <Box className='markdown-body'>
                                    <ReactMarkdown remarkPlugins={ [remarkGfm] }>{ editUser.aboutText }</ReactMarkdown>
                                </Box>
                            )
                        }
                        {
                            isAboutEdit
                            && (
                                <EditAbout
                                    userId={ profileUser.userId }
                                    defaultAboutText={ editUser?.aboutText }
                                    setCurrentUser={ setEditUser }
                                    closeEdit={ () => setAboutEdit(false) }
                                />
                            )
                        }
                    </Box>
                </VStack>
            </Card>
        </Box>
    );
}

export default UserCard;
