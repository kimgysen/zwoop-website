import TagsSearchBox from "@components/widgets/tags/TagsSearchBox";
import {FC, useState} from "react";
import Tag from "@models/db/entity/Tag";
import {findTagsStartingWith} from "@api_clients/feature/tag/TagApiClient";
import {Box} from "@chakra-ui/layout/src/box";


interface SearchboxProps {
    onSelectTag: (tag: string) => void
}

const Searchbox: FC<SearchboxProps> = ({ onSelectTag }) => {
    const [tags, setTags] = useState<Tag[]>([]);

    const fetchTags = (tagName: string) => {
        findTagsStartingWith(tagName)
            .then(res => {
                setTags(res.data)
            });
    }

    return (
        <Box w='350px'>
            <TagsSearchBox
                defaultTags={ tags.map((tag) => ({ label: tag.tagName, value: tag.tagId })) }
                fetchTags={ fetchTags }
                tags={ tags.map((tag) => ({ label: tag.tagName, value: tag.tagId })) }
                onSelectTag={ onSelectTag }
                />
        </Box>
    );
};

export default Searchbox;
