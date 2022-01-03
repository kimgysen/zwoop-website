import React, {FC, useEffect, useState} from "react";
import Select, {components, DropdownIndicatorProps, GroupBase} from 'react-select';
import {FaSearch} from 'react-icons/fa';


type TagOptionType = { label: string, value: string }

interface TagsBoxProps {
    defaultTags: TagOptionType[]
    fetchTags: (tagQuery: string) => void,
    tags: TagOptionType[],
    onSelectTag: (tag: string) => void
}


const TagsSearchBox: FC<TagsBoxProps> = ({ defaultTags, fetchTags, tags = [], onSelectTag }) => {
    const TAGS_REQUEST_MIN_CHARS_TRESHOLD = 2;

    const [ options, setOptions ]     = useState(tags);
    const [ menuIsOpen, setMenuOpen ] = useState(false);


    useEffect(() => {
        setOptions(tags);
    }, [tags]);

    const changeInputHandler = (val: string) => {
        if (val.length >= TAGS_REQUEST_MIN_CHARS_TRESHOLD) {
            fetchTags(val);
            setMenuOpen(true);
        } else {
            setOptions([]);
            setMenuOpen(false);
        }
    };

    const ClearIndicatorStyles = (base: any, state: { isFocused: any; }) => ({
        ...base,
        cursor: 'pointer',
        color: state.isFocused ? 'blue' : 'black',
    });

    const DropdownIndicator = (props: JSX.IntrinsicAttributes & DropdownIndicatorProps<unknown, boolean, GroupBase<unknown>>) => {
        return(
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    <FaSearch />
                </components.DropdownIndicator>
            )
        )
    }

    const addTagHandler = (tag: unknown) => {
        if (tag) {
            onSelectTag((tag as TagOptionType).label);
        }
    };


    return (
        <Select
            instanceId='unique-val'
            defaultValue={defaultTags}
            onInputChange={changeInputHandler}
            menuIsOpen={menuIsOpen}
            closeMenuOnSelect={false}
            styles={{ clearIndicator: ClearIndicatorStyles }}
            isClearable={ true }
            options={options}
            placeholder='Search tags'
            components={{ DropdownIndicator }}
            onChange={ addTagHandler }
        />
    );

}

export default TagsSearchBox;
