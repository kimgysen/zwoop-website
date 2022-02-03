import Post from "@models/post/Post";
import Card from "@components/layout/components/card/Card";
import {Box, Button, Divider, Flex} from "@chakra-ui/react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import React, {useState} from "react";
import TagsList from "@components/widgets/tags/TagsList";
import BnbBoxSm from "./subviews/BnbBoxSm";
import PostTitleView from "@components/pages/post/post_view/subviews/PostTitleView";
import PostUserBox from "@components/pages/post/post_view/subviews/PostUserBox";
import {FaPlus} from "react-icons/fa";
import AddBidView from "@components/pages/post/post_view/subviews/AddBidView";


interface PostViewProps {
    post: Post
}

const PostView: React.FC<PostViewProps> = ({ post }) => {

    const [showAddBid, setShowAddBid] = useState<boolean>(false);

    return (
        <Card>
            <Flex pb='10px'>
                <Box pr='10px'>
                    <BnbBoxSm
                        price={ post.bidPrice }
                        currency={ post.currency }
                    />
                </Box>
                <PostTitleView
                    title={ post.postTitle }
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
                    <ReactMarkdown remarkPlugins={ [remarkGfm] }>{ post.postText }</ReactMarkdown>
                </Box>
            </Box>
            <Box pt='10px' pb='10px'>
                <TagsList tags={post.tags} />
            </Box>
            <Divider />
            <Flex flex={1}
                  justifyContent={ 'space-between' }
                  pt='10px' pb='10px'
                  fontSize='sm'
            >
                <Box>
                    <Button
                        fontSize='sm'
                        leftIcon={<FaPlus />}
                        colorScheme='teal'
                        variant='solid'
                        onClick={ () => setShowAddBid(!showAddBid) }
                    >
                        Add bid
                    </Button>
                </Box>
                <Box>
                    <PostUserBox
                        userId={ post.asker.userId }
                        nickName={ post.asker.nickName }
                        avatarSrc={ post.asker.profilePic }
                    />
                </Box>
            </Flex>
            {
                showAddBid
                && <AddBidView defaultBidPrice={ post.bidPrice } />
            }
        </Card>)
}

export default PostView;
