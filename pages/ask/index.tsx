import {NextPage} from "next";
import Head from "next/head";
import React, {useState} from "react";
import AppLayout from "@components/layout/AppLayout";
import CenterContainer from "@components/layout/center/CenterContainer";
import {Box} from "@chakra-ui/layout/src/box";
import {Flex} from "@chakra-ui/react";
import EditFormDetailsView from "@components/pages/ask/EditFormDetailsView";
import BtnCancelSaveView from "@components/widgets/form/BtnCancelSaveView";
import Tag from "@models/Tag";


const Ask: NextPage = () => {
    const [title, setTitle] = useState<string>('');
    const [descriptionMd, setDescriptionMd] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [offer, setOffer] = React.useState<string>('150')

    const onCancel = (e: any) => {
        console.log('cancel');
    }

    const onSave = (e: any) => {
        const post = { title, descriptionMd, tags, offer };
        console.log(post);
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
                                    setters={{ setTitle, setDescriptionMd, setTags, setOffer }}
                                />
                            </Box>
                            <BtnCancelSaveView
                                onCancel={ onCancel }
                                onSave = { onSave }
                            />
                        </Box>
                    </Flex>
                </CenterContainer>
            </AppLayout>
        </>
    )

}

export default Ask;
