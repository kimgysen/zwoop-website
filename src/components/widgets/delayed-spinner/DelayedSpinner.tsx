import React, {FC, useEffect, useState} from 'react';
import {Center, Spinner} from "@chakra-ui/react";

interface DelayedSpinnerProps {
    timeOutMs: number
}

const DelayedSpinner: FC<DelayedSpinnerProps> = ({ timeOutMs }) => {
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowSpinner(true), timeOutMs);

        return () => clearTimeout(timer);
    });

    return (
        <Center
            py={'20px'}
            height={'500px'}
        >
            {
                showSpinner && <Spinner/>
            }
        </Center>
    )
};

export default DelayedSpinner;
