import ProgressStep from "@components/widgets/progress-stepper/ProgressStep";


export const findActiveStepIndex = (steps: ProgressStep[]) =>
    steps.findIndex(step => step.isActive);

