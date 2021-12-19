import React from "react";

import {
    Box,
    Divider,
    Input,
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
import {findTagsStartingWith} from "@apiclients/feature/tag/TagService";
import Tag from "@models/Tag";


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

    const fetchTags = (tagName: string) => {
        findTagsStartingWith(tagName)
            .then(res => {
                setters.setTags(res.data)
            });
    }

    return (
        <Card>
            <Box>
                <Input
                    focusBorderColor= 'none'
                    size            = "lg"
                    placeholder     = "What is your request?"
                    backgroundColor = "white"
                    onChange        = { e => setters.setTitle(e.target.value) }
                    defaultValue    = { post.title }
                />
            </Box>
            <Box mt='10px' mb='15px'>
                <MarkdownEditor
                    description     = { post.descriptionMd }
                    setDescription  = { (descriptionMd: string) => setters.setDescriptionMd(descriptionMd) }
                />
            </Box>
            <FormCard
                title='Tags'
                description={<p>Add max 5 tags:</p>}
            >
                <TagsBox
                    defaultTags   = { post.tags.map((tag) => ({ label: tag.tagName, value: tag.tagId })) }
                    fetchTags     = { fetchTags }
                    tags          = { post.tags.map((tag) => ({ label: tag.tagName, value: tag.tagId })) }
                    setTags       = { setters.setTags }
                />
            </FormCard>
            <Divider mt='15px' mb='15px' />
            <FormCard
                title='Offer price'
                description='Amount of TRX you offer in exchange for support'>
                <NumberInput
                    size='md'
                    maxW="32"
                    defaultValue={150}
                    min={10}
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
