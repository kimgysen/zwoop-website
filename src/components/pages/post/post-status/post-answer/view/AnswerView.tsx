import React, {FC, useState} from "react";
import Answer from "@models/db/entity/Answer";
import Card from "@components/layout/components/card/Card";
import AuthState from "@models/auth/AuthState";
import AnswerReadView from "@components/pages/post/post-status/post-answer/view/subviews/AnswerReadView";
import AnswerUpdateViewHoc from "@components/pages/post/post-status/post-answer/view/subviews/AnswerUpdateViewHoc";
import Post from "@models/db/entity/Post";

interface AnswerViewProps {
    authState: AuthState,
    post: Post,
    answer: Answer
}

const AnswerView: FC<AnswerViewProps> = ({ authState, post, answer }) => {
    const [isEditView, setEditView] = useState<boolean>(false);

    return (
        <>
            <Card>
                {
                    !isEditView
                    && <AnswerReadView
                            authState={ authState }
                            post={ post }
                            answer={ answer }
                            activateEditView={ () => setEditView(true) }
                        />
                }
                {
                    isEditView
                    && <AnswerUpdateViewHoc
                            postId={ post?.postId }
                            answer={ answer }
                            deactivateEditView={ () => setEditView(false) }
                        />
                }
            </Card>
        </>
    )
}

export default AnswerView;
