import React, {FC} from "react";
import DelayedSpinner from "@components/widgets/delayed-spinner/DelayedSpinner";


const PostInboxLoading: FC = () => {
    return <DelayedSpinner timeOutMs={500} />
}

export default PostInboxLoading;
