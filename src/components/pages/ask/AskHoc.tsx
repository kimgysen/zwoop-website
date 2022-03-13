import React, {FC, useEffect, useState} from "react";
import {Box} from "@chakra-ui/layout/src/box";
import EditFormDetailsView from "@components/pages/ask/subviews/EditFormDetailsView";
import SaveButton from "@components/widgets/form/buttons/SaveButton";
import {validateForm} from "@components/pages/ask/subviews/validate";
import {createPostApi} from "@api_clients/feature/post/PostApiClient";
import Tag from "@models/dto/domain-client-dto/tag/TagDto";
import {useRouter} from "next/router";

const AskHoc: FC = () => {
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
        const resp = await createPostApi({
            title,
            text: descriptionMd,
            tags,
            currencyCode: 'BNB',
            bidPrice
        });

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
            <Box className='post-question-box'>
                <EditFormDetailsView
                    post = {{ title, descriptionMd, tags, bidPrice }}
                    setters={{
                        setTitle,
                        setDescriptionMd,
                        setTags,
                        setBidPrice
                    }}
                />
                <Box mt={5} pb={10}>
                    <SaveButton
                        label='Publish'
                        onSave = { onSave }
                        shouldDisableSave={ !isFormValid }
                        saveError={ saveError }
                    />
                </Box>
            </Box>
        </>
    )
}

export default AskHoc;
