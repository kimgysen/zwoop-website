import React, {FC, useEffect, useState} from "react";
import ProgressStepper from "@components/widgets/progress-stepper/ProgressStepper";
import postProgressSteps from "@components/pages/post/post-stepper/postSteps";
import ProgressStep from "@components/widgets/progress-stepper/ProgressStep";
import {setActiveStep} from "@components/pages/post/post-stepper/PostStepperHelper";
import {getPostStatusFromPost} from "@components/pages/post/PostPageHelper";
import {getStompDispatcher} from "../../../../event_dispatchers/StompDispatcher";
import {
    POST_STEPPER__ANSWER_ACCEPTED,
    POST_STEPPER__ANSWER_ADDED,
    POST_STEPPER__ANSWER_REMOVED,
    POST_STEPPER__DEAL_CANCELLED,
    POST_STEPPER__DEAL_INIT
} from "../../../../event_dispatchers/config/StompEvents";
import {PostStatusEnum} from "@models/enums/PostStatusEnum";
import {Box} from "@chakra-ui/layout/src/box";
import PostDto from "@models/dto/domain-client-dto/post/PostDto";


interface PostStepperHocProps {
    postDto?: PostDto
}

const stompDispatcher = getStompDispatcher();

const PostStepperHoc: FC<PostStepperHocProps> = ({ postDto }) => {

    const defaultSteps = setActiveStep(getPostStatusFromPost(postDto), postProgressSteps);
    const [postSteps, setPostSteps] = useState<ProgressStep[]>(defaultSteps);


    useEffect(() => {
        setPostSteps(
            setActiveStep(getPostStatusFromPost(postDto), postSteps));
    }, [postDto?.postId]);

    useEffect(() => {
        if (postDto) {
            stompDispatcher.on(POST_STEPPER__DEAL_INIT, () => {
                const updatedSteps = setActiveStep(PostStatusEnum.DEAL_INIT, postSteps);
                setPostSteps(updatedSteps);
            });

            stompDispatcher.on(POST_STEPPER__DEAL_CANCELLED, () => {
                const updatedSteps = setActiveStep(PostStatusEnum.POST_INIT, postSteps);
                setPostSteps(updatedSteps);
            });
            stompDispatcher.on(POST_STEPPER__ANSWER_ADDED, () => {
                const updatedSteps = setActiveStep(PostStatusEnum.ANSWERED, postSteps);
                setPostSteps(updatedSteps);
            });
            stompDispatcher.on(POST_STEPPER__ANSWER_REMOVED, () => {
                const updatedSteps = setActiveStep(PostStatusEnum.DEAL_INIT, postSteps);
                setPostSteps(updatedSteps);
            });
            stompDispatcher.on(POST_STEPPER__ANSWER_ACCEPTED, () => {
                const updatedSteps = setActiveStep(PostStatusEnum.ANSWER_ACCEPTED, postSteps);
                setPostSteps(updatedSteps);
            });
        }

        return function cleanUp() {
            if (postDto) {
                stompDispatcher.remove(POST_STEPPER__DEAL_INIT);
                stompDispatcher.remove(POST_STEPPER__DEAL_CANCELLED);
                stompDispatcher.remove(POST_STEPPER__ANSWER_ADDED);
                stompDispatcher.remove(POST_STEPPER__ANSWER_REMOVED);
                stompDispatcher.remove(POST_STEPPER__ANSWER_ACCEPTED);
            }
        }
    }, [postDto?.postId, postSteps]);

    return (
        <>
            <Box sx={{ position: 'sticky', top: '70px', }}>
                <ProgressStepper
                    steps={ postSteps }
                />
            </Box>
        </>
    )

}

export default PostStepperHoc;
