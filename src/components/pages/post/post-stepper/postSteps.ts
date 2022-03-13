import ProgressStep from "@components/widgets/progress-stepper/ProgressStep";
import {PostStatusEnum} from "@models/enums/PostStatusEnum";

const postSteps: ProgressStep[] = [
    {
        id: PostStatusEnum.POST_SETUP,
        title: 'Ask',
        caption: 'Ask question',
        isActive: false
    },
    {
        id: PostStatusEnum.POST_INIT,
        title: 'Bidding',
        caption: 'Open for bidding',
        isActive: false
    },
    {
        id: PostStatusEnum.DEAL_INIT,
        title: 'Deal made',
        caption: 'Find resolution',
        isActive: false
    },
    {
        id: PostStatusEnum.ANSWERED,
        title: 'Answered',
        caption: 'Waiting for approval',
        isActive: false
    },
    {
        id: PostStatusEnum.ANSWER_ACCEPTED,
        title: 'Answer accepted',
        caption: 'OP accepted',
        isActive: false
    },
    {
        id: PostStatusEnum.PAID,
        title: 'Paid',
        caption: 'Smart contract paid out',
        isActive: false
    }
];

export default postSteps;


