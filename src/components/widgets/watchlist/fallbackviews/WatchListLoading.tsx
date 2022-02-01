import {FC} from "react";
import DelayedSpinner from "@components/widgets/delayed-spinner/DelayedSpinner";


const WatchListLoading: FC = () => {
    return (
        <>
            <DelayedSpinner
                timeOutMs={ 750 }
                height={'50px'}
            />
        </>
    )
}

export default WatchListLoading;
