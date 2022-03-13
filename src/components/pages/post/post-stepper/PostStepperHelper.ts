import deepCopy from 'deepcopy';
import ProgressStep from "@components/widgets/progress-stepper/ProgressStep";
import {PostStatusEnum} from "@models/enums/PostStatusEnum";

const resetSteps = (progressSteps: ProgressStep[]) =>
    progressSteps.map(step => {
        step.isActive = false;
        return step;
    });

export const setActiveStep = (postStatus: PostStatusEnum|null, progressSteps: ProgressStep[]) => {
    const clonedSteps = deepCopy(progressSteps);
    if (postStatus) {
        resetSteps(clonedSteps);
        const step = clonedSteps?.find(step => step.id === postStatus.toString());
        if (step)
            step.isActive = true;

    } else {
        clonedSteps[0].isActive = true;
    }

    return clonedSteps;
}

