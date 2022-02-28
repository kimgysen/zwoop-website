import {FC} from "react";
import ProgressStep from "@components/widgets/progress-stepper/ProgressStep";
import ProgressStepItem from "@components/widgets/progress-stepper/ProgressStepItem";
import {Box} from "@chakra-ui/layout/src/box";
import styles from './ProgressStepItem.module.css';
import {findActiveStepIndex} from "@components/widgets/progress-stepper/ProgressStepperHelper";


interface ProgressStepperProps {
    steps: ProgressStep[]
}

const ProgressStepper:FC<ProgressStepperProps> = ({ steps }) => {
    return (
        <Box className={ styles.wrapper }>
            <ul className={ styles['step-progress'] }>
                {
                    steps.map((step, idx) =>
                        <ProgressStepItem
                            key={ `progress-step-${ idx }` }
                            step={ step }
                            stepIndex={ idx }
                            activeStepIndex={ findActiveStepIndex(steps) }
                        />
                    )
                }
            </ul>
        </Box>
    )
}

export default ProgressStepper;
