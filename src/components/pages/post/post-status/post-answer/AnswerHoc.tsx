import React, {FC, useState} from "react";
import Post from "@models/db/entity/Post";
import AuthState from "@models/auth/AuthState";
import Card from "@components/layout/components/card/Card";
import ReactMdeEditor from "@components/widgets/react-mde/ReactMde";
import {Heading} from "@chakra-ui/layout/src/heading";
import {Box} from "@chakra-ui/layout/src/box";
import AnswerButton from "@components/pages/post/post-status/post-answer/AnswerButton";

interface AnswerHocProps {
    authState: AuthState,
    post: Post
}

const AnswerHoc: FC<AnswerHocProps> = ({ authState, post }) => {
    const [description, setDescription] = useState<string>('');

    return (
        <Box className={'post-answer-box'}>
            <Card>
                <Heading
                    as="h2"
                    size="sm"
                    py='.5rem'
                    maxHeight={ "2.8rem" }
                    sx={{ overflow: 'hidden' }}
                >
                    Add answer
                </Heading>
                <Box pb='10px'>
                    <ReactMdeEditor
                        description={ description }
                        setDescription={ setDescription }
                    />
                </Box>
                <AnswerButton
                    post={ post }
                />
            </Card>
        </Box>
    )
}

export default AnswerHoc;

