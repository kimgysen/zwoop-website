import {NextPage} from "next";
import {getPostById, updatePost} from "@api_clients/feature/post/PostService";
import {AxiosError, AxiosResponse} from "axios";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import AuthState from "@models/user/AuthState";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import CenterContainer from "@components/layout/center/CenterContainer";
import {Flex} from "@chakra-ui/react";
import {Box} from "@chakra-ui/layout/src/box";
import EditFormDetailsView from "@components/pages/ask/EditFormDetailsView";
import SaveButton from "@components/widgets/form/buttons/SaveButton";
import Tag from "@models/tag/Tag";
import {getRawJwt} from "../../../src/service/jwt/JwtService";
import CancelButton from "@components/widgets/form/buttons/CancelButton";


export async function getServerSideProps(ctx: { query: { postId: string } }) {
    const {postId} = ctx.query;

    return getPostById(postId)
        .then((resp: AxiosResponse) =>
            ({props: { post: resp.data, errorCode: null }}))
        .catch((reason: AxiosError) =>
            ({ notFound: true }));

}

const PostEditPage: NextPage = (props: any) => {
    const { data: session, status } = useSession();
    const { post } = props;
    const router = useRouter();

    const [authState, setAuthState] = useState<AuthState>({ isLoggedIn: false });

    const [title, setTitle] = useState<string>(post?.postTitle);
    const [descriptionMd, setDescriptionMd] = useState<string>(post?.postText);
    const [tags, setTags] = useState<Tag[]>(post?.tags);
    const [bidPrice, setBidPrice] = React.useState<string>(post?.bidPrice);
    const [isFormValid, setFormValid] = useState(true);
    const [saveError, setSaveError] = useState<string|null>(null);

    useEffect(() => {
        if (session && session.userId) {
            setAuthState({ isLoggedIn: true, principalId: session.userId as string })
        } else {
            router.push('/login');
        }
    }, [session?.userId]);

    const onSave = async (e: any) => {
        const jwt = await getRawJwt();
        const resp = await updatePost(post.postId, {
            title,
            text: descriptionMd,
            tags,
            currencyCode: 'BNB',
            bidPrice
        }, jwt);

        if (resp.error) {
            setSaveError(resp.error);
        } else {
            router.push(`/post/${ post.postId }`);
        }
    }

    return (
        <>
            <Head>
                <title>Post edit page</title>
            </Head>
            <AppLayout>
                <CenterContainer>
                    <Flex pt={'10px'}>
                        <Box
                            flex={ 1 }
                            justifyContent={ 'flex-end' }
                        >
                            <Box mt={3}>
                                <EditFormDetailsView
                                    post = {{ title, descriptionMd, tags, bidPrice }}
                                    setters={{
                                        setTitle,
                                        setDescriptionMd,
                                        setTags,
                                        setBidPrice
                                    }}
                                />
                            </Box>
                            <Flex
                                mt={5}
                                pb={10}
                                justifyContent={'flex-end'}
                            >
                                <CancelButton
                                    onCancel={ () => {
                                        router.push(`/post/${ post?.postId }`)
                                    }}
                                />
                                <SaveButton
                                    label='Publish'
                                    onSave = { onSave }
                                    shouldDisableSave={ !isFormValid }
                                    saveError={ saveError }
                                />
                            </Flex>
                        </Box>
                    </Flex>
                </CenterContainer>
            </AppLayout>
        </>
    );}

export default PostEditPage;
