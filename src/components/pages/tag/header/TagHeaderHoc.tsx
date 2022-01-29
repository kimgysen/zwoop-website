import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import TagHeader from "@components/pages/tag/header/TagHeader";
import ApiResult from "@api_clients/type/ApiResult";
import {isWatching, unwatchTag, watchTag} from "@api_clients/feature/tag/TagService";
import {IsWatchingTag} from "@models/user/IsWatchingTag";


interface TagHeaderHoc {
    tagName: string,
    setWatchListDirty: Dispatch<SetStateAction<boolean>>
}

const TagHeaderHoc: FC<TagHeaderHoc> = ({ tagName, setWatchListDirty }) => {

    let defaultIsWatchingRes = { loading: false, success: null, error: null };

    const [ isWatchingRes, setWatchingRes ] = useState<ApiResult<IsWatchingTag>>(defaultIsWatchingRes);

    useEffect(() => {
        (async() => {
            setWatchingRes({ ...defaultIsWatchingRes, loading: true })
            const isWatchingRes = await isWatching(tagName);
            setWatchingRes(isWatchingRes);
        })();
    }, []);

    const handleWatch = async (tagName: string) => {
        setWatchingRes({ ...defaultIsWatchingRes, loading: true })
        const resWatch = await watchTag(tagName);
        setWatchListDirty(true);
        setWatchingRes(resWatch);
    }

    const handleUnwatch = async (tagName: string) => {
        setWatchingRes({ ...defaultIsWatchingRes, loading: true })
        const resWatch = await unwatchTag(tagName);
        setWatchListDirty(true);
        setWatchingRes(resWatch);
    }


    return (
        <TagHeader
            tagName={ tagName }
            isWatchingRes={ isWatchingRes }
            handleWatch={ handleWatch }
            handleUnwatch={ handleUnwatch }
        />
    )
}

export default TagHeaderHoc;
