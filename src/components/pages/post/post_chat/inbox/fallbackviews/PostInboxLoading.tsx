import React, {FC} from "react";
import DelayedSpinner from "@components/widgets/delayed-spinner/DelayedSpinner";


const PostInboxLoading: FC = () => {
    return <DelayedSpinner
        timeOutMs={500}
        height='50px'
    />
}

export default PostInboxLoading;
