import React, {FC} from "react";
import {Heading} from "@chakra-ui/layout/src/heading";
import {Box, Divider, Flex} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {isAnswerOwner, isOp} from "../../../../../../../util/PostUtil";
import AnswerViewConsultantMenu
    from "@components/pages/post/post-status/post-answer/view/subviews/consultant-menu/AnswerViewConsultantMenu";
import PostUserBox from "@components/pages/post/post_view/subviews/PostUserBox";
import AuthState from "@models/auth/AuthState";
import AnswerViewOpMenu from "@components/pages/post/post-status/post-answer/view/subviews/op-menu/AnswerViewOpMenu";
import AnswerDto from "@models/dto/rest/receive/answer/AnswerDto";
import PostDto from "@models/dto/rest/receive/post/PostDto";


interface AnswerReadViewProps {
    authState: AuthState,
    postDto: PostDto,
    answerDto: AnswerDto,
    activateEditView: () => void
}

const AnswerReadView: FC<AnswerReadViewProps> = ({ authState, postDto, answerDto, activateEditView }) => {
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
                    <ReactMarkdown remarkPlugins={ [remarkGfm] }>{ answerDto?.answerText }</ReactMarkdown>
                </Box>
            </Box>
            <Divider />
            <Flex flex={1}
                  justifyContent={
                      isAnswerOwner(authState, answerDto)
                      || isOp(authState, postDto)
                          ? 'space-between'
                          : 'flex-end' }
                  pt='10px' pb='10px'
                  fontSize='sm'
            >
                {
                    isAnswerOwner(authState, answerDto)
                    && <AnswerViewConsultantMenu
                            answerDto={ answerDto }
                            activateEditView={ activateEditView }
                        />
                }
                {
                    isOp(authState, postDto)
                    && <AnswerViewOpMenu answerDto={ answerDto } />
                }
                <PostUserBox
                    userId={ answerDto?.consultant?.userId }
                    nickName={ answerDto?.consultant?.nickName }
                    avatar={ answerDto?.consultant?.avatar }
                />
            </Flex>
        </>
    )
}

export default AnswerReadView;
