import React, {FC} from "react";
import InboxItemReceiveDto from "../../../../../service/stomp/receive/InboxItemReceiveDto";
import {Box, Divider} from "@chakra-ui/react";
import AppInboxItem from "@components/layout/navbar/notification/inbox/AppInboxItem";
import AuthState from "@models/user/AuthState";
import AppInboxLoading from "@components/layout/navbar/notification/inbox/fallbackviews/AppInboxLoading";
import AppInboxEmpty from "@components/layout/navbar/notification/inbox/fallbackviews/AppInboxEmpty";
import {isInboxEmpty, isLastInboxItem} from "../../../../../util/InboxUtil";


interface AppInboxProps {
    authState: AuthState,
    inboxLoading: boolean,
    inboxItems: InboxItemReceiveDto[]
}

const AppInbox: FC<AppInboxProps> = ({ authState, inboxLoading, inboxItems }) => {

    return <>
        {
            inboxLoading
            && <AppInboxLoading />
        }
        {
            !inboxLoading
            && isInboxEmpty(inboxItems)
            && <AppInboxEmpty />
        }
        {
            inboxItems
            && !isInboxEmpty(inboxItems)
            && inboxItems.map((inboxItem, idx) => (
                <Box key={`inboxItem-${ idx }`}
                     textAlign='left'
                >
                    <AppInboxItem
                        authState={ authState }
                        inboxItem={ inboxItem }
                    />
                    {
                        isLastInboxItem(inboxItems, idx) &&
                            <Divider />
                    }
                </Box>
            ))
        }
    </>

}

export default AppInbox;