import 'react-toastify/dist/ReactToastify.css';
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
import Tag from "@models/dto/domain-client-dto/tag/TagDto";
import {infoToast} from "@components/widgets/toast/AppToast";
import {PostStatusEnum} from "@models/enums/PostStatusEnum";
import {isOp} from "../../../../util/PostUtil";
import PostDto from "@models/dto/domain-client-dto/post/PostDto";


interface PostViewProps {
    authState: AuthState,
    postDto: PostDto
}

const stompDispatcher = getStompDispatcher();

const PostViewHoc: React.FC<PostViewProps> = ({ authState, postDto }) => {
    const [title, setTitle] = useState<string>(postDto?.postTitle);
    const [description, setDescription] = useState<string>(postDto?.postText);
    const [bidPrice, setBidPrice] = useState<string>(postDto?.bidPrice);
    const [tags, setTags] = useState<Tag[]>(postDto?.tagList || []);
    const [postStatus, setPostStatus] = useState<PostStatusEnum>(getPostStatusFromPost(postDto))

    const updatePost = (postUpdateDto: PostDto) => {
        setTitle(postUpdateDto.postTitle);
        setDescription(postUpdateDto.postText);
        setBidPrice(postUpdateDto.bidPrice);
        setTags(postUpdateDto.tagList);
    }

    useEffect(() => {
        updatePost(postDto);

        if (postDto?.postId) {
            stompDispatcher.on(POST_VIEW__POST_CHANGED, (postChangedDto: PostDto) => {
                if (postChangedDto) {
                    setTitle(postChangedDto.postTitle);
                    setDescription(postChangedDto.postText);
                    setBidPrice(postChangedDto.bidPrice);
                    setTags(postChangedDto.tagList);

                    infoToast(`${ postChangedDto.op?.nickName } updated this post`);
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

    }, [postDto?.postId, postStatus]);


    return (
        <Card>
            <Flex pb='10px'>
                <Box pr='10px'>
                    <BnbBoxSm
                        price={ bidPrice }
                        currencyCode={ postDto?.currencyCode }
                    />
                </Box>
                <PostTitleView
                    title={ title }
                    createdAt={ postDto.createdAt }
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
                      isOp(authState, postDto)
                      && postStatus === PostStatusEnum.POST_INIT
                          ? 'space-between'
                          : 'flex-end' }
                  pt='10px' pb='10px'
                  fontSize='sm'
            >
                {
                    isOp(authState, postDto)
                    && postStatus === PostStatusEnum.POST_INIT
                    && (
                        <PostViewOwnerMenu
                            postId={ postDto?.postId}
                            postStatus={ postStatus }
                        />
                    )
                }
                <PostUserBox
                    userId={ postDto?.op?.userId }
                    nickName={ postDto?.op?.nickName }
                    avatar={ postDto?.op?.avatar }
                />
            </Flex>
        </Card>)
}

export default PostViewHoc;
