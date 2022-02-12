import {NextPage} from "next";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import AppLayout from "@components/layout/AppLayout";
import CenterContainer from "@components/layout/center/CenterContainer";
import {Box} from "@chakra-ui/layout/src/box";
import {Flex} from "@chakra-ui/react";
import EditFormDetailsView from "@components/pages/ask/EditFormDetailsView";
import Tag from "@models/tag/Tag";
import {getRawJwt} from "../../src/service/jwt/JwtService";
import SaveButton from "@components/widgets/form/buttons/SaveButton";
import {createPost} from "@api_clients/feature/post/PostService";
import {useRouter} from "next/router";
import {validateForm} from "@components/pages/ask/validate";


const Ask: NextPage = () => {

    const router = useRouter();

    const [title, setTitle] = useState<string>('');
    const [descriptionMd, setDescriptionMd] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [bidPrice, setBidPrice] = React.useState<string>('0.01');
    const [isFormValid, setFormValid] = useState(false);
    const [saveError, setSaveError] = useState<string|null>(null);


    useEffect(() => {
        const post = localStorage.getItem('createPost');
        if (post) {
            const postJson = JSON.parse(post);
            setTitle(postJson.title);
            setDescriptionMd(postJson.descriptionMd);
            setTags(postJson.tags);
            setBidPrice(postJson.bidPrice);
        }
    }, []);

    useEffect(() => {
        const formIsValid = validateForm(title, descriptionMd, tags, parseFloat(bidPrice));
        localStorage.setItem('createPost', JSON.stringify({ title, descriptionMd, tags, bidPrice }));
        if (formIsValid) {
            setFormValid(formIsValid);
        }
    }, [title, descriptionMd, tags, bidPrice]);


    const onSave = async (e: any) => {
        const jwt = await getRawJwt();
        const resp = await createPost({
            title,
            text: descriptionMd,
            tags,
            currencyCode: 'BNB',
            bidPrice
        }, jwt);

        if (resp.error) {
            setSaveError(resp.error);

        } else {
            localStorage.setItem('createPost', JSON.stringify({
                title: '',
                descriptionMd: '',
                tags: [],
                bidPrice: '0.01'
            }));
            router.push(resp.success as string);
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
                                    post = {{ title, descriptionMd, tags, bidPrice }}
                                    setters={{
                                        setTitle,
                                        setDescriptionMd,
                                        setTags,
                                        setBidPrice
                                    }}
                                />
                            </Box>
                            <Box mt={5} pb={10}>
                                <SaveButton
                                    label='Publish'
                                    onSave = { onSave }
                                    shouldDisableSave={ !isFormValid }
                                    saveError={ saveError }
                                />
                            </Box>
                        </Box>
                    </Flex>
                </CenterContainer>
            </AppLayout>
        </>
    )

}

export default Ask;
