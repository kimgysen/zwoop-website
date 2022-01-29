import {FC} from "react";


interface WatchListErrorProps {
    errorMsg: string
}

const WatchListError: FC<WatchListErrorProps> = ({ errorMsg }) => {
    return (
        <>
            { errorMsg }
        </>
    )
}

export default WatchListError;
