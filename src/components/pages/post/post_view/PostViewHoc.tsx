import 'react-toastify/dist/ReactToastify.css';

import Post from "@models/db/entity/Post";
import Card from "@components/layout/components/card/Card";
import {Box, Divider, Flex} from "@chakra-ui/react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import React, {useEffect, useState} from "react";
import TagsList from "@components/widgets/tags/TagsList";
import BnbBoxSm from "./subviews/BnbBoxSm";
import PostTitleView from "@components/pages/post/post_view/subviews/PostTitleView";
import PostUserBox from "@components/pages/post/post_view/subviews/PostUserBox";
import AuthState from "@models/auth/AuthState";
import {getPostStatusFromPost} from "@components/pages/post/PostPageHelper";
import PostViewOwnerMenu from "@components/pages/post/post_view/subviews/PostViewOwnerMenu";
import {getStompDispatcher} from "../../../../event_dispatchers/StompDispatcher";
import {
    POST_VIEW__DEAL_CANCELLED,
    POST_VIEW__DEAL_INIT,
    POST_VIEW__POST_CHANGED,
    POST_VIEW__POST_REMOVED
} from "../../../../event_dispatchers/config/StompEvents";
import PostChangedDto from "../../../../models/dto/stomp/receive/post/feature/post/PostChangedDto";
import Tag from "@models/db/entity/Tag";
import {infoToast} from "@components/widgets/toast/AppToast";
import {PostStatusEnum} from "@models/db/entity/PostStatus";
import {isOp} from "../../../../util/PostUtil";


interface PostViewProps {
    authState: AuthState,
    post: Post
}

const stompDispatcher = getStompDispatcher();

const PostViewHoc: React.FC<PostViewProps> = ({ authState, post }) => {

    const [title, setTitle] = useState<string>(post?.postTitle);
    const [description, setDescription] = useState<string>(post?.postText);
    const [bidPrice, setBidPrice] = useState<string>(post?.bidPrice);
    const [tags, setTags] = useState<Tag[]>(post?.tags);
    const [postStatus, setPostStatus] = useState<PostStatusEnum>(getPostStatusFromPost(post))

    const updatePost = (postUpdate: Post) => {
        setTitle(postUpdate.postTitle);
        setDescription(postUpdate.postText);
        setBidPrice(postUpdate.bidPrice);
        setTags(postUpdate.tags);
    }

    useEffect(() => {
        updatePost(post);

        if (post?.postId) {
            stompDispatcher.on(POST_VIEW__POST_CHANGED, (postUpdate: PostChangedDto) => {
                if (postUpdate) {
                    setTitle(postUpdate.postTitle);
                    setDescription(postUpdate.postText);
                    setBidPrice(postUpdate.bidPrice);
                    setTags(postUpdate.tags);

                    infoToast(`${ postUpdate.nickName } updated this post`);
                }
            });

            stompDispatcher.on(POST_VIEW__POST_REMOVED, () => {
                console.log('post got removed');
            });

            stompDispatcher.on(POST_VIEW__DEAL_INIT, () => {
                setPostStatus(PostStatusEnum.DEAL_INIT);
            });

            stompDispatcher.on(POST_VIEW__DEAL_CANCELLED, () => {
                setPostStatus(PostStatusEnum.POST_INIT);
            });
        }

        return function cleanUp() {
            stompDispatcher.remove(POST_VIEW__POST_CHANGED);
            stompDispatcher.remove(POST_VIEW__POST_REMOVED);
            stompDispatcher.remove(POST_VIEW__DEAL_INIT);
            stompDispatcher.remove(POST_VIEW__DEAL_CANCELLED);
        }

    }, [post?.postId, postStatus]);


    return (
        <Card>
            <Flex pb='10px'>
                <Box pr='10px'>
                    <BnbBoxSm
                        price={ bidPrice }
                        currency={ post.currency }
                    />
                </Box>
                <PostTitleView
                    title={ title }
                    createdAt={ post.createdAt }
                />
            </Flex>
            <Divider />
            <Box
                maxW='540px'
                py='10px'
                overflowX='scroll'
            >
                <Box className='markdown-body'>
                    <ReactMarkdown remarkPlugins={ [remarkGfm] }>{ description }</ReactMarkdown>
                </Box>
            </Box>
            <Box pt='10px' pb='10px'>
                <TagsList tags={tags} />
            </Box>
            <Divider />
            <Flex flex={1}
                  justifyContent={
                      isOp(authState, post)
                      && postStatus === PostStatusEnum.POST_INIT
                          ? 'space-between'
                          : 'flex-end' }
                  pt='10px' pb='10px'
                  fontSize='sm'
            >
                {
                    isOp(authState, post)
                    && postStatus === PostStatusEnum.POST_INIT
                    && (
                        <PostViewOwnerMenu
                            postId={ post?.postId}
                            postStatus={ postStatus }
                        />
                    )
                }
                <PostUserBox
                    userId={ post?.op?.userId }
                    nickName={ post?.op?.nickName }
                    avatar={ post?.op?.profilePic }
                />
            </Flex>
        </Card>)
}

export default PostViewHoc;
