import React, {FC, useEffect, useState} from "react";
import Select, {OnChangeValue} from 'react-select';
import Tag from "@models/Tag";


// Types for react-select.
// One of the convoluted beauties of TS where leaving the gibberish makes much more sense.
type TagOptionType = { label: string, value: string }


interface TagsBoxProps {
  defaultTags: TagOptionType[]
  fetchTags: (tagQuery: string) => void,
  tags: TagOptionType[],
  setTags: (tags: Tag[]) => void
}


const TagsBox: FC<TagsBoxProps> = ({ defaultTags, fetchTags, tags = [], setTags }) => {
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

  const addTagHandler = (tags: OnChangeValue<TagOptionType, true>) => {
    if (tags) {
      setTags((tags as TagOptionType[]).map((tag) => ({ tagName: tag.label, tagId: tag.value})));
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
        defaultValue={defaultTags}
        onInputChange={changeInputHandler}
        onChange={addTagHandler}
        menuIsOpen={menuIsOpen}
        closeMenuOnSelect={false}
        styles={{ clearIndicator: ClearIndicatorStyles }}
        isClearable={ true }
        isMulti
        options={options}
    />

  );

};

export default TagsBox;
