import React, {FC, useState} from "react";
import {Heading} from "@chakra-ui/layout/src/heading";
import {Box} from "@chakra-ui/layout/src/box";
import ReactMdeEditor from "@components/widgets/react-mde/ReactMde";
import CancelButton from "@components/widgets/form/buttons/CancelButton";
import {Spacer} from "@chakra-ui/layout/src/spacer";
import {Flex} from "@chakra-ui/layout/src/flex";
import ApiResult from "@api_clients/type/ApiResult";
import {updateAnswerApi} from "@api_clients/feature/answer/AnswerApiClient";
import SaveButton from "@components/widgets/form/buttons/SaveButton";
import AnswerDto from "@models/dto/domain-client-dto/answer/AnswerDto";


interface AnswerUpdateHocProps {
    postId: string,
    answerDto: AnswerDto,
    deactivateEditView: () => void
}

const AnswerUpdateViewHoc: FC<AnswerUpdateHocProps> = ({ postId, answerDto, deactivateEditView }) => {
    const answerId = answerDto?.answerId;

    const [answerText, setAnswerText] = useState<string>(answerDto?.answerText);
    const [updateRes, setUpdateRes] = useState<ApiResult<AnswerDto>>();

    const onUpdate = async () => {
        const res = await updateAnswerApi(answerId, { postId, answerText });
        setUpdateRes(res);

        if (res.success) {
            deactivateEditView();
        }
    }

    return (
        <>
            <Heading
                as="h2"
                size="sm"
                py='.5rem'
                maxHeight={ "2.8rem" }
                sx={{ overflow: 'hidden' }}
            >
                Edit answer
            </Heading>
            <Box pb='10px'>
                <ReactMdeEditor
                    description={ answerText }
                    setDescription={ setAnswerText }
                />
            </Box>
            <Flex mt={'5px'} pb={'5px'}>
                <Spacer />
                <Box mr='5px'>
                    <CancelButton
                        size='sm'
                        onCancel={ deactivateEditView }
                    />
                </Box>
                <SaveButton
                    size='sm'
                    label={'Save'}
                    onSave={ onUpdate }
                    saveError={ updateRes?.error }
                    shouldDisableSave={false}
                />
            </Flex>
        </>
    )
}

export default AnswerUpdateViewHoc;
