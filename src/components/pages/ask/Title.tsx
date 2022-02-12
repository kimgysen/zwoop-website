import {FormControl, FormErrorMessage, FormHelperText, Input} from "@chakra-ui/react";
import React, {useState} from "react";
import {TITLE_MAX_CHARS, TITLE_MIN_CHARS} from "@components/pages/ask/validate";


interface TitleProps {
    title: string,
    setTitle: (title: string) => void
}


const Title: React.FC<TitleProps> = ({ title, setTitle }) => {
    const [isErrorMinChars, setErrorMinChars] = useState(false);
    const [isErrorMaxChars, setErrorMaxChars] = useState(false);

    const handleInputChange = (e: any) => {
        const title = e.target.value;
        if (isErrorMinChars && title.length > TITLE_MIN_CHARS) {
            setErrorMinChars(false)
        }
        setErrorMaxChars(title.length > TITLE_MAX_CHARS);
        setTitle(e.target.value);
    }

    const handleInputBlur = (e: any) => {
        const title = e.target.value;
        setErrorMinChars(title.length < TITLE_MIN_CHARS);
    }

    return (
        <FormControl
            id='frm-ctr-title'
            isInvalid={isErrorMinChars || isErrorMaxChars}
            isRequired
        >
            <Input
                id='title'
                focusBorderColor='none'
                size="lg"
                placeholder="What is your question?"
                backgroundColor="white"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                defaultValue={title}
            />
            {
                isErrorMinChars ? (
                    <FormErrorMessage>Min required characters: {TITLE_MIN_CHARS}</FormErrorMessage>
                ) : (
                    <FormHelperText/>
                )
            }
            {
                isErrorMaxChars ? (
                    <FormErrorMessage>Max allowed characters: {TITLE_MAX_CHARS}</FormErrorMessage>
                ) : (
                    <FormHelperText/>
                )
            }
        </FormControl>
    );
}

export default Title;
