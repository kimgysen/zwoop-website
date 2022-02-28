import {FC} from "react";
import ProgressStep from "@components/widgets/progress-stepper/ProgressStep";
import styles from './ProgressStepItem.module.css';
import clsx from "clsx";

interface ProgressStepProps {
    step: ProgressStep,
    stepIndex: number,
    activeStepIndex: number
}

const ProgressStepItem:FC<ProgressStepProps> = ({ step, stepIndex, activeStepIndex }) => {
    const styleIsDone = stepIndex < activeStepIndex
        ? styles['is-done']
        : '';

    const styleIsCurrent = step?.isActive
        ? styles.current
        : '';

    const itemCls = clsx(
        styles['step-progress-item'],
        styleIsCurrent,
        styleIsDone);

    return (
        <li className={`${ itemCls }`}>
            <strong>{ step.title }</strong>
            <div>
                { step.caption }
            </div>
        </li>
    )
}

export default ProgressStepItem;
