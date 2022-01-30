import React, {FC} from "react";
import {Divider, Heading, HStack, IconButton, Text} from "@chakra-ui/react";
import {FaChevronLeft} from 'react-icons/fa';
import {useRouter} from "next/router";
import {PostPageViewState} from "@components/pages/post/PostViewHelper";


interface PostChatHeaderProps {
    postId: string,
    viewState: PostPageViewState,
    partnerNickName: string
}

const PostChatHeader: FC<PostChatHeaderProps> =
    ({ postId, viewState, partnerNickName }) => {

    const router = useRouter();

    const backToInbox = () => {
        router.push(
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
                            <IconButton as='span'
                                 w='5%'
                                 onClick={ backToInbox }
                                 colorScheme="blue"
                                 aria-label="Search database"
                                 icon={<FaChevronLeft />}
                            />
                            <Text w='95%' isTruncated>
                                { partnerNickName }
                            </Text>
                        </HStack>
                    )
                }
                {
                    viewState === PostPageViewState.VISITOR_PRIVATE_CHAT
                    && <Text>{ partnerNickName }</Text>
                }
            </Heading>
            <Divider />

        </>
    );

}

export default PostChatHeader;