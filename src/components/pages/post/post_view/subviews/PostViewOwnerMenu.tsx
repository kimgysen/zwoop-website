import React, {FC, useState} from "react";
import {Flex, Link, useDisclosure} from "@chakra-ui/react";
import NextLink from "next/link";
import DeletePostModal from "@components/pages/post/post_view/modal/DeletePostModal";
import ApiResult from "@api_clients/type/ApiResult";
import {PostStatusEnum} from "@models/db/entity/PostStatus";


interface PostViewOwnerMenuProps {
    postId: string,
    postStatus: PostStatusEnum
}

const PostViewOwnerMenu: FC<PostViewOwnerMenuProps> = ({ postId, postStatus }) => {

    const defaultResult = { loading: false, success: null, error: null };
    const [deleteResult, setDeleteResult] = useState<ApiResult<boolean>>(defaultResult);
    const { isOpen: isDeleteModalopen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose} = useDisclosure();


    const handleDeletePost = () => {
        console.log('delete post');
    }

    return (
        <>
            <Flex
                fontSize={'sm'}
                fontWeight={500}
                color={ 'gray.400' }
            >
                {
                    postStatus === PostStatusEnum.POST_INIT
                    && (
                        <>
                            <NextLink href={`/post/${ postId }/edit`} passHref>
                                <Link
                                    p={2}
                                    _hover={{
                                        textDecoration: 'underline'
                                    }}>
                                    Edit
                                </Link>
                            </NextLink>
                            <Link
                                p={2}
                                onClick={ onDeleteModalOpen }
                                _hover={{
                                    textDecoration: 'underline'
                                }}>
                                Delete
                            </Link>
                        </>
                    )
                }
            </Flex>
            <DeletePostModal
                isOpen={ isDeleteModalopen }
                onClose={ onDeleteModalClose }
                deletePost={ handleDeletePost }
                deleteResult={ deleteResult }
            />

        </>
    )
}

export default PostViewOwnerMenu;
