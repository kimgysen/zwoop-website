import React, {FC, useState} from "react";
import Card from "@components/layout/components/card/Card";
import AuthState from "@models/auth/AuthState";
import AnswerReadView from "@components/pages/post/post-status/post-answer/view/subviews/AnswerReadView";
import AnswerUpdateViewHoc from "@components/pages/post/post-status/post-answer/view/subviews/AnswerUpdateViewHoc";
import PostDto from "@models/dto/rest/receive/post/PostDto";
import AnswerDto from "@models/dto/rest/receive/answer/AnswerDto";

interface AnswerViewProps {
    authState: AuthState,
    postDto: PostDto,
    answerDto: AnswerDto
}

const AnswerView: FC<AnswerViewProps> = ({ authState, postDto, answerDto }) => {
    const [isEditView, setEditView] = useState<boolean>(false);

    return (
        <>
            <Card>
                {
                    !isEditView
                    && <AnswerReadView
                            authState={ authState }
                            postDto={ postDto }
                            answerDto={ answerDto }
                            activateEditView={ () => setEditView(true) }
                        />
                }
                {
                    isEditView
                    && <AnswerUpdateViewHoc
                            postId={ postDto?.postId }
                            answerDto={ answerDto }
                            deactivateEditView={ () => setEditView(false) }
                        />
                }
            </Card>
        </>
    )
}

export default AnswerView;
