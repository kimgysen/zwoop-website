import {NextPage} from "next";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import AppLayout from "@components/layout/AppLayout";
import CenterContainer from "@components/layout/center/CenterContainer";
import {Box} from "@chakra-ui/layout/src/box";
import {Flex} from "@chakra-ui/react";
import EditFormDetailsView from "@components/pages/ask/EditFormDetailsView";
import Tag from "@models/Tag";
import {validateForm} from "./validate";
import {getRawJwt} from "../../src/service/jwt/JwtService";
import SaveButton from "@components/widgets/form/buttons/SaveButton";
import {createPost} from "@apiclients/feature/post/PostService";
import {useRouter} from "next/router";


const Ask: NextPage = () => {

    const router = useRouter();

    const [title, setTitle] = useState<string>('');
    const [descriptionMd, setDescriptionMd] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [offer, setOffer] = React.useState<string>('0.003');
    const [isFormValid, setFormValid] = useState(false);
    const [saveError, setSaveError] = useState<string|null>(null);


    useEffect(() => {
        const post = localStorage.getItem('createPost');
        if (post) {
            const postJson = JSON.parse(post);
            setTitle(postJson.title);
            setDescriptionMd(postJson.descriptionMd);
            setTags(postJson.tags);
            setOffer(postJson.offer);
        }
    }, []);

    useEffect(() => {
        const formIsValid = validateForm(title, descriptionMd, tags, parseFloat(offer));
        if (formIsValid) {
            localStorage.setItem('createPost', JSON.stringify({ title, descriptionMd, tags, offer }));
        }
        setFormValid(formIsValid);
    }, [title, descriptionMd, tags, offer]);


    const onSave = async (e: any) => {
        const jwt = await getRawJwt();
        const resp = await createPost({
            title,
            text: descriptionMd,
            tagIds: tags.map(tag => tag.tagId),
            currency: 'BNB',
            offer
        }, jwt);

        if (resp.error) {
            setSaveError(resp.error);

        } else {
            console.log(resp.result);
            router.push(resp.result);
        }
    }


    return (
        <>
            <Head>
                <title>Ask</title>
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
                                    post = {{ title, descriptionMd, tags, offer }}
                                    setters={{
                                        setTitle,
                                        setDescriptionMd,
                                        setTags,
                                        setOffer
                                    }}
                                />
                            </Box>
                            <SaveButton
                                onSave = { onSave }
                                shouldDisableSave={ !isFormValid }
                                saveError={ saveError }
                            />
                        </Box>
                    </Flex>
                </CenterContainer>
            </AppLayout>
        </>
    )

}

export default Ask;
