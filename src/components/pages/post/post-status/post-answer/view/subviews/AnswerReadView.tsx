import React, {FC} from "react";
import {Heading} from "@chakra-ui/layout/src/heading";
import {Badge, Box, Divider, Flex, Spacer, Text} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {isAnswerOwner, isOp} from "../../../../../../../util/PostUtil";
import AnswerViewConsultantMenu
    from "@components/pages/post/post-status/post-answer/view/subviews/consultant-menu/AnswerViewConsultantMenu";
import PostUserBox from "@components/pages/post/post_view/subviews/PostUserBox";
import AuthState from "@models/auth/AuthState";
import AnswerViewOpMenu from "@components/pages/post/post-status/post-answer/view/subviews/op-menu/AnswerViewOpMenu";
import AnswerDto from "@models/dto/domain-client-dto/answer/AnswerDto";
import PostDto from "@models/dto/domain-client-dto/post/PostDto";


interface AnswerReadViewProps {
    authState: AuthState,
    postDto: PostDto,
    answerDto: AnswerDto,
    activateEditView: () => void,
    isAnswerAccepted: boolean
}

const AnswerReadView: FC<AnswerReadViewProps> = ({ authState, postDto, answerDto, activateEditView, isAnswerAccepted }) => {
    return (
        <>
            <Heading
                as="h2"
                size="sm"
                maxHeight={ "2.8rem" }
                sx={{ overflow: 'hidden' }}
            >
                <Flex>
                    <Text>
                        Answer
                    </Text>
                    <Spacer />
                    {
                        isAnswerAccepted
                        && <Box>
                                <Badge
                                    variant='solid'
                                    colorScheme='green'
                                    p={'2px'}
                                >
                                    Answer accepted
                                </Badge>
                            </Box>
                    }
                    {
                        !isAnswerAccepted
                        && isOp(authState, postDto)
                        && <AnswerViewOpMenu answerDto={ answerDto } />
                    }
                </Flex>
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
