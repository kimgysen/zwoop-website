import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import ApiRes from "../../../api_clients/type/ApiResult";
import AuthState from "@models/auth/AuthState";
import {getFollowedTags} from "@api_clients/feature/user/UserApiClient";
import WatchList from "@components/widgets/watchlist/WatchList";
import Tag from "@models/dto/domain-client-dto/tag/TagDto";


interface WatchListHocProps {
    authState: AuthState,
    isDirty?: boolean,
    setIsDirty?: Dispatch<SetStateAction<boolean>>
}

const WatchListHoc: FC<WatchListHocProps> = ({ authState, isDirty, setIsDirty }) => {
    const [tagsRes, setTagsRes] = useState<ApiRes<Tag[]>>({ loading: true, success: null, error: null });

    useEffect(() => {
        (async() => {
            if (authState.isLoggedIn) {
                const res = await getFollowedTags(authState.principalId as string);
                setTagsRes(res);
            }
        })();
    }, [authState.isLoggedIn]);

    useEffect(() => {
        (async() => {
            if (authState.isLoggedIn && isDirty) {
                const res = await getFollowedTags(authState.principalId as string);
                setTagsRes(res);

                if (setIsDirty)
                    setIsDirty(false);
            }
        })();
    }, [isDirty]);

    return (
        <WatchList
            tagsRes={ tagsRes } />
    )

}
export default WatchListHoc;
