import React, {FC} from "react";
import {Heading} from "@chakra-ui/layout/src/heading";
import {Box, Divider, Flex} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {isAnswerOwner, isOp} from "../../../../../../../util/PostUtil";
import AnswerViewConsultantMenu
    from "@components/pages/post/post-status/post-answer/view/subviews/consultant-menu/AnswerViewConsultantMenu";
import PostUserBox from "@components/pages/post/post_view/subviews/PostUserBox";
import Answer from "@models/db/entity/Answer";
import AuthState from "@models/auth/AuthState";
import Post from "@models/db/entity/Post";
import AnswerViewOpMenu from "@components/pages/post/post-status/post-answer/view/subviews/op-menu/AnswerViewOpMenu";


interface AnswerReadViewProps {
    authState: AuthState,
    post: Post,
    answer: Answer,
    activateEditView: () => void
}

const AnswerReadView: FC<AnswerReadViewProps> = ({ authState, post, answer, activateEditView }) => {
    return (
        <>
            <Heading
                as="h2"
                size="sm"
                py='.5rem'
                maxHeight={ "2.8rem" }
                sx={{ overflow: 'hidden' }}
            >
                Answer
            </Heading>
            <Box
                maxW='540px'
                py='10px'
                overflowX='scroll'
            >
                <Box className='markdown-body'>
                    <ReactMarkdown remarkPlugins={ [remarkGfm] }>{ answer?.answerText }</ReactMarkdown>
                </Box>
            </Box>
            <Divider />
            <Flex flex={1}
                  justifyContent={
                      isAnswerOwner(authState, answer)
                      || isOp(authState, post)
                          ? 'space-between'
                          : 'flex-end' }
                  pt='10px' pb='10px'
                  fontSize='sm'
            >
                {
                    isAnswerOwner(authState, answer)
                    && <AnswerViewConsultantMenu
                            answer={ answer }
                            activateEditView={ activateEditView }
                        />
                }
                {
                    isOp(authState, post)
                    && <AnswerViewOpMenu answer={ answer } />
                }
                <PostUserBox
                    userId={ answer?.consultant?.userId }
                    nickName={ answer?.consultant?.nickName }
                    avatar={ answer?.consultant?.profilePic }
                />
            </Flex>
        </>
    )
}

export default AnswerReadView;
