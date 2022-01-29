import React, {FC, useState} from "react";
import NextLink from "next/link";
import {signOut} from "next-auth/react";
import {FaSignOutAlt, FaUser} from 'react-icons/fa';
import {
    Button,
    Divider,
    HStack,
    Image,
    Link,
    List,
    ListItem,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    useColorModeValue
} from "@chakra-ui/react";


interface UserWidgetProps {
    userId: string,
    profilePic: string
}

const UserWidget: FC<UserWidgetProps> = ({ userId, profilePic }) => {

    const [avatar, setAvatar] = useState(profilePic);

    const handleError = () => {
        setAvatar('/static/images/profile_fallback.jpg');
    }

    return (
        <Popover
            closeOnBlur={true}
            placement='top-start'
        >
            <PopoverTrigger>
                <Button
                    as={'a'}
                    pr='5px'
                    ml='5px'
                    mr='5px'
                    fontSize={'sm'}
                    fontWeight={400}
                    variant={'link'}>
                    <Image
                        w='35px'
                        h='35px'
                        mr='10px'
                        src={ avatar }
                        onError={handleError}
                        alt='profile pic'
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                borderStyle='solid'
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                outline={0}
                _focus={{ boxShadow: "dark-lg" }}
                fontSize='md'
                width='150px'
            >
                <PopoverArrow />
                <PopoverBody>
                    <List
                        spacing={3}
                        textAlign='left'
                    >
                        <ListItem>
                            <HStack spacing='20px'>
                                <FaUser color={'gray.750'} />
                                <NextLink href={`/user/${ userId }`} passHref>
                                    <Link>Profile</Link>
                                </NextLink>
                            </HStack>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <HStack spacing='20px'>
                                <FaSignOutAlt />
                                <a
                                    href={`/api/auth/signout`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        signOut()
                                    }}
                                >
                                    logout
                                </a>
                            </HStack>
                        </ListItem>
                    </List>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default UserWidget;