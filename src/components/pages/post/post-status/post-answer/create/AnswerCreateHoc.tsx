import React, {FC, useState} from "react";
import AuthState from "@models/auth/AuthState";
import Card from "@components/layout/components/card/Card";
import ReactMdeEditor from "@components/widgets/react-mde/ReactMde";
import {Heading} from "@chakra-ui/layout/src/heading";
import {Box} from "@chakra-ui/layout/src/box";
import SaveButton from "@components/widgets/form/buttons/SaveButton";
import ApiResult from "@api_clients/type/ApiResult";
import {createAnswerApi} from "@api_clients/feature/answer/AnswerApiClient";
import AnswerDto from "@models/dto/rest/receive/answer/AnswerDto";
import {dispatchCustomMessage} from "../../../../../../service/stomp/subscriptions/SubscriptionUtil";
import {
    POST_STATUS__ANSWER_ADDED,
    POST_STEPPER__ANSWER_ADDED
} from "../../../../../../event_dispatchers/config/StompEvents";

interface AnswerHocProps {
    authState: AuthState,
    postId: string,
    answerDto?: AnswerDto|null
}

const AnswerCreateHoc: FC<AnswerHocProps> = ({ authState, postId }) => {
    const [answerText, setAnswerText] = useState<string>('');

    const [saveRes, setSaveRes] = useState<ApiResult<AnswerDto>>();

    const onSave = async () => {
        if (answerText && answerText.length > 0) {
            const res = await createAnswerApi({ postId, answerText });
            setSaveRes(res);

            if (res?.success) {
                dispatchCustomMessage(POST_STATUS__ANSWER_ADDED, res?.success as AnswerDto);
                dispatchCustomMessage(POST_STEPPER__ANSWER_ADDED, res?.success as AnswerDto);
            }
        }
    }

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
                        description={ answerText }
                        setDescription={ setAnswerText }
                    />
                </Box>
            </Card>
            <Box mt={'5px'} pb={'10px'}>
                <SaveButton
                    label='Publish'
                    onSave = { onSave }
                    shouldDisableSave={ false }
                    saveError={ saveRes?.error }
                />
            </Box>
        </Box>
    )
}

export default AnswerCreateHoc;

