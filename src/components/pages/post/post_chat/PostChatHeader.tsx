import React, {FC} from "react";
import {Button, Divider, Heading, HStack, Link, Text} from "@chakra-ui/react";
import {FaChevronLeft} from 'react-icons/fa';
import {useRouter} from "next/router";
import {PostPageViewState} from "@components/pages/post/PostPageHelper";
import NextLink from "next/link";


interface PostChatHeaderProps {
    postId: string,
    viewState: PostPageViewState,
    partnerId: string,
    partnerNickName: string
}

const PostChatHeader: FC<PostChatHeaderProps> =
    ({ postId, viewState, partnerId, partnerNickName }) => {

    const router = useRouter();

    const backToInbox = async () => {
        await router.push(
            `/post/${ postId }`
        );
    }

    return (
        <>
            <Heading as='h2'
                     size='sm'
                     p='10px'>
                {
                    viewState === PostPageViewState.INBOX
                    && <Text>Inbox</Text>
                }
                {
                    viewState === PostPageViewState.INBOX_DETAIL_CHAT
                    && (
                        <HStack>
                            <Button
                                fontSize= '11px'
                                colorScheme='teal'
                                variant='link'
                                onClick={ backToInbox }
                                padding='5px'
                            >
                                <FaChevronLeft />
                                Inbox
                            </Button>
                            <Text
                                w='95%'
                                maxW='220px'
                                isTruncated
                            >To:&nbsp;
                                <NextLink href={`/user/${ partnerId }`} passHref>
                                    <Link>{ partnerNickName }</Link>
                                </NextLink>
                            </Text>
                        </HStack>
                    )
                }
                {
                    viewState === PostPageViewState.VISITOR_PRIVATE_CHAT
                    && (
                        <Text
                            w='95%'
                            maxW='220px'
                            isTruncated
                        >
                            To:&nbsp;
                            <NextLink href={`/user/${ partnerId }`} passHref>
                                <Link>{ partnerNickName }</Link>
                            </NextLink>
                        </Text>
                    )
                }
            </Heading>
            <Divider />

        </>
    );

}

export default PostChatHeader;