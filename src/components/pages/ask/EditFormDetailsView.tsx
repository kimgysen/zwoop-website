import React, {useState} from "react";

import {
    Box,
    Divider,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from "@chakra-ui/react";
import FormCard from "@components/widgets/form/FormCard";
import Card from "@components/layout/components/card/Card";
import MarkdownEditor from "@components/widgets/markdown/MarkdownEditor";
import TagsBox from "@components/widgets/tags/TagsBox";
import {findTagsStartingWith} from "../../../api_clients/feature/tag/TagService";
import Tag from "@models/tag/Tag";
import Title from "./Title";


export type Post = {
    title: string,
    descriptionMd: string,
    tags: Tag[],
    offer: string
}

export type PostSetters = {
    setTitle: (title: string) => void,
    setDescriptionMd: (descriptionMd: string) => void,
    setTags: (tags: Tag[]) => void,
    setOffer: (offer: string) => void
}

interface FormDetailsViewProps {
    post: Post,
    setters: PostSetters
}

const EditFormDetailsView: React.FC<FormDetailsViewProps> = ({ post, setters }) => {

    const [tagOptions, setTagOptions] = useState([]);

    const fetchTags = (tagName: string) => {
        findTagsStartingWith(tagName)
            .then(res => {
                const tagOptions = res.data
                    .map((tag: any) => ({ label: tag.tagName, value: tag.tagId }));
                setTagOptions(tagOptions);
            });
    }

    return (
        <Card>
            <Title
                title={ post.title }
                setTitle={ setters.setTitle }
            />
            <Box mt='10px' mb='15px'>
                <MarkdownEditor
                    description     = { post.descriptionMd }
                    setDescription  = { (descriptionMd: string) => setters.setDescriptionMd(descriptionMd) }
                />
            </Box>
            <FormCard
                title='Tags'
                description={<p>Add max 3 tags:</p>}
            >
                <TagsBox
                    defaultTags   = { post.tags.map((tag) => ({ label: tag.tagName, value: tag.tagId })) }
                    tagOptions    = { tagOptions }
                    fetchTags     = { fetchTags }
                    tags          = { post.tags.map((tag) => ({ label: tag.tagName, value: tag.tagId })) }
                    setTags       = { setters.setTags }
                    maxTags       = { 3 }
                />
            </FormCard>
            <Divider mt='15px' mb='15px' />
            <FormCard
                title='Offer price'
                description='Amount of BNB you offer in exchange for support'>
                <NumberInput
                    size='md'
                    maxW="32"
                    defaultValue={ 0.033 }
                    inputMode='decimal'
                    precision={ 3 }
                    step={ .001 }
                    min={ .003 }
                    onChange={(valueString: string) => setters.setOffer(valueString)}
                    value={post.offer}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormCard>
        </Card>
    );
}

export default EditFormDetailsView;
