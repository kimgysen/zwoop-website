import React, {FC, useEffect, useState} from 'react';
import {Center, Spinner} from "@chakra-ui/react";

interface DelayedSpinnerProps {
    timeOutMs: number,
    height: string
}

const DelayedSpinner: FC<DelayedSpinnerProps> = ({ timeOutMs, height }) => {
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowSpinner(true), timeOutMs);

        return () => clearTimeout(timer);
    });

    return (
        <Center
            py={'20px'}
            height={ height }
        >
            {
                showSpinner && <Spinner/>
            }
        </Center>
    )
};

export default DelayedSpinner;
