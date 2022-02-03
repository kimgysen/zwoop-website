import React, {FC, useState} from "react";
import NextLink from "next/link";
import {Box, HStack, Image, Link} from "@chakra-ui/react";


interface PostUserTsxProps {
    userId: string,
    nickName: string,
    avatarSrc: string
}

const PostUserBox: FC<PostUserTsxProps> = ({ userId, nickName, avatarSrc }) => {

    const [imageSrc, setImageSrc] = useState(avatarSrc);

    const handleError = () => {
        setImageSrc('/static/images/profile_fallback.jpg');
    }

    return (
        <NextLink href={`/user/${ userId }`} passHref>
            <Link>
                <HStack>
                    <Image
                        w='35px'
                        h='35px'
                        mr='10px'
                        src={ imageSrc }
                        onError={ handleError }
                        alt='profile pic'
                    />
                    <Box>{ nickName || userId }</Box>
                </HStack>
            </Link>
        </NextLink>
    )
}

export default PostUserBox;
