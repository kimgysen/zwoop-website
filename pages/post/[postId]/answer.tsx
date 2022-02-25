import {NextPage} from "next";
import {getSsrPostById} from "@api_clients/feature/post/PostApiClient";
import {AxiosError, AxiosResponse} from "axios";
import {useSession} from "next-auth/react";


export async function getServerSideProps(ctx: { query: { postId: string } }) {
    const {postId} = ctx.query;

    return getSsrPostById(postId)
        .then((resp: AxiosResponse) =>
            ({props: { post: resp.data, errorCode: null }}))
        .catch((reason: AxiosError) =>
            ({ notFound: true }));

}

const PostAnswerPage: NextPage = (props: any) => {
    const { data: session, status } = useSession();
    const { post } = props;

    return (
        <>
            Answer
        </>
    )

}

export default PostAnswerPage;
