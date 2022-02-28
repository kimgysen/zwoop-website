import React, {FC, useEffect, useState} from "react";
import ProgressStepper from "@components/widgets/progress-stepper/ProgressStepper";
import postProgressSteps from "@components/pages/post/post-stepper/postSteps";
import Post from "@models/db/entity/Post";
import ProgressStep from "@components/widgets/progress-stepper/ProgressStep";
import {setActiveStep} from "@components/pages/post/post-stepper/PostStepperHelper";
import {getPostStatusFromPost} from "@components/pages/post/PostPageHelper";
import {getStompDispatcher} from "../../../../event_dispatchers/StompDispatcher";
import {POST_STEPPER__DEAL_CANCELLED, POST_STEPPER__DEAL_INIT} from "../../../../event_dispatchers/config/StompEvents";
import {PostStatusEnum, stringFromPostStatusEnum} from "@models/db/entity/PostStatus";
import {Box} from "@chakra-ui/layout/src/box";


interface PostStepperHocProps {
    post?: Post
}

const stompDispatcher = getStompDispatcher();

const PostStepperHoc: FC<PostStepperHocProps> = ({ post }) => {

    const defaultSteps = setActiveStep(getPostStatusFromPost(post), postProgressSteps);
    const [postSteps, setPostSteps] = useState<ProgressStep[]>(defaultSteps);


    useEffect(() => {
        setPostSteps(
            setActiveStep(getPostStatusFromPost(post), postSteps));
    }, [post?.postId]);

    useEffect(() => {
        if (post) {
            stompDispatcher.on(POST_STEPPER__DEAL_INIT, () => {
                const updatedSteps = setActiveStep(
                    stringFromPostStatusEnum(PostStatusEnum.DEAL_INIT), postSteps);
                setPostSteps(updatedSteps);
            });

            stompDispatcher.on(POST_STEPPER__DEAL_CANCELLED, () => {
                const updatedSteps = setActiveStep(
                    stringFromPostStatusEnum(PostStatusEnum.POST_INIT), postSteps);
                setPostSteps(updatedSteps);
            });
        }

        return function cleanUp() {
            if (post) {
                stompDispatcher.remove(POST_STEPPER__DEAL_INIT);
                stompDispatcher.remove(POST_STEPPER__DEAL_CANCELLED);
            }
        }
    }, [post?.postId, postSteps]);

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
