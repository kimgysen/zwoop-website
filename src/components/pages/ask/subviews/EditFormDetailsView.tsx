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
import TagsBox from "@components/widgets/tags/TagsBox";
import {findTagsStartingWith} from "@api_clients/feature/tag/TagApiClient";
import Tag from "@models/db/entity/Tag";
import Title from "./Title";
import ReactMdeEditor from "@components/widgets/react-mde/ReactMde";


type EditPost = {
    title: string,
    descriptionMd: string,
    tags: Tag[],
    bidPrice: string
}

type PostSetters = {
    setTitle: (title: string) => void,
    setDescriptionMd: (descriptionMd: string) => void,
    setTags: (tags: Tag[]) => void,
    setBidPrice: (bidPrice: string) => void
}

interface FormDetailsViewProps {
    post: EditPost,
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
                <ReactMdeEditor
                    description={ post.descriptionMd }
                    setDescription={ setters.setDescriptionMd }
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
                title='Bid price'
                description='Amount of BNB you offer in exchange for support'>
                <NumberInput
                    size='md'
                    maxW="32"
                    defaultValue={ 0.01 }
                    inputMode='decimal'
                    precision={ 2 }
                    step={ .01 }
                    min={ .01 }
                    onChange={(valueString: string) => setters.setBidPrice(valueString)}
                    value={post.bidPrice}
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
