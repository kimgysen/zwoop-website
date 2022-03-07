import React, {FC} from "react";
import InboxItemDto from "@models/dto/stomp/receive/user-notification/feature/inbox/InboxItemDto";
import {Box, Divider} from "@chakra-ui/react";
import AppInboxItem from "@components/layout/navbar/notification/inbox/appinbox/AppInboxItem";
import AuthState from "@models/auth/AuthState";
import AppInboxLoading from "@components/layout/navbar/notification/inbox/appinbox/fallbackviews/AppInboxLoading";
import AppInboxEmpty from "@components/layout/navbar/notification/inbox/appinbox/fallbackviews/AppInboxEmpty";
import {isInboxEmpty, isLastInboxItem} from "../../../../../../util/InboxUtil";


interface AppInboxProps {
    authState: AuthState,
    inboxLoading: boolean,
    inboxItems: InboxItemDto[],
    closePopup: () => void
}

const AppInbox: FC<AppInboxProps> = ({ authState, inboxLoading, inboxItems, closePopup }) => {

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
            !inboxLoading
            && !isInboxEmpty(inboxItems)
            && inboxItems.map((inboxItem, idx) => (
                <Box key={`inboxItem-${ idx }`}
                     textAlign='left'
                >
                    <AppInboxItem
                        authState={ authState }
                        inboxItem={ inboxItem }
                        closePopup={ closePopup }
                    />
                    {
                        !isLastInboxItem(inboxItems, idx)
                        && <Divider />
                    }
                </Box>
            ))
        }
    </>

}

export default AppInbox;
