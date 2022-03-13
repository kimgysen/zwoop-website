import React, {FC, useState} from "react";
import Select, {OnChangeValue} from 'react-select';
import Tag from "@models/dto/domain-client-dto/tag/TagDto";


// Types for react-select.
// One of the convoluted beauties of TS where leaving the gibberish makes much more sense.
type TagOptionType = { label: string, value: string }


interface TagsBoxProps {
  defaultTags: TagOptionType[]
  tagOptions: TagOptionType[],
  fetchTags: (tagQuery: string) => void,
  tags: TagOptionType[],
  setTags: (tags: Tag[]) => void,
  maxTags: number
}


const TagsBox: FC<TagsBoxProps> = (
    { defaultTags, tagOptions, fetchTags, tags = [], setTags, maxTags }) => {
  const TAGS_REQUEST_MIN_CHARS_TRESHOLD = 2;

  const [ menuIsOpen, setMenuOpen ] = useState(false);


  const changeInputHandler = (val: string) => {
    if (val.length >= TAGS_REQUEST_MIN_CHARS_TRESHOLD) {
      fetchTags(val);
      setMenuOpen(true);
    } else {
      setMenuOpen(false);
    }
  };

  const addTagHandler = (tags: OnChangeValue<TagOptionType, true>) => {
    if (tags && tags.length < maxTags + 1) {
      setTags((tags as TagOptionType[])
          .map((tag) =>
              ({ tagName: tag.label, tagId: tag.value})));
    }
  };


  const ClearIndicatorStyles = (base: any, state: { isFocused: any; }) => ({
    ...base,
    cursor: 'pointer',
    color: state.isFocused ? 'blue' : 'black',
  });


  return (
    <Select
        instanceId='unique-val'
        value={tags}
        onInputChange={changeInputHandler}
        onChange={addTagHandler}
        menuIsOpen={menuIsOpen}
        closeMenuOnSelect={false}
        styles={{ clearIndicator: ClearIndicatorStyles }}
        isClearable={ true }
        isMulti
        options={tagOptions}
    />

  );

};

export default TagsBox;
