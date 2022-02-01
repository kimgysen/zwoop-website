import {Textarea, TextareaProps} from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import React, {forwardRef} from "react";

const AutoResizeTextarea = forwardRef<
    HTMLTextAreaElement,
    TextareaProps
    >((props, ref) => {
    return (
        <Textarea
            minH="unset"
            overflow="hidden"
            w="100%"
            resize="none"
            ref={ref}
            minRows={3}
            as={ResizeTextarea}
            {...props}
        />
    );
});

AutoResizeTextarea.displayName = 'AutoResizeTextarea';

export default AutoResizeTextarea;
