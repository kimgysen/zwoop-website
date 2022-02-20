import React, {FC, useEffect, useState} from "react";
import InboxItemReceiveDto from "../../../../../service/stomp/dto/receive/inbox/InboxItemReceiveDto";
import {countUnreadMessages, rebuildInbox, sortInboxItems} from "../../../../../util/InboxUtil";
import AuthState from "@models/user/AuthState";
import {getStompDispatcher} from "../../../../../event_dispatchers/StompDispatcher";
import {
    APP_INBOX__ON_INBOX_UPDATE_RECEIVED,
    APP_INBOX__ON_INIT_ITEMS_LOADING,
    APP_INBOX__ON_INIT_ITEMS_RECEIVED
} from "../../../../../event_dispatchers/config/StompEvents";
import {getAppDispatcher} from "../../../../../event_dispatchers/AppDispatcher";
import {APP_INBOX__ITEM_READ} from "../../../../../event_dispatchers/config/AppEvents";
import {resetCounterForPartner} from "@components/pages/post/post_chat/private_chat/PrivateChatWidgetHelper";
import AppInboxButton from "@components/layout/navbar/notification/inbox/AppInboxButton";
import {infoToast} from "@components/widgets/toast/AppToast";


interface AppInboxButtonHocProps {
    authState: AuthState,
    url: string
}

const AppInboxButtonHoc: FC<AppInboxButtonHocProps> = ({ authState, url }) => {

    const [inboxLoading, setInboxLoading] = useState<boolean>(true);
    const [inboxItems, setInboxItems] = useState<InboxItemReceiveDto[]>([]);
    const [nrUnread, setNrUnread] = useState<number>(0);

    const stompDispatcher = getStompDispatcher();
    const appDispatcher = getAppDispatcher();

    useEffect(() => {
        if (authState.principalId) {
            const principalId = authState.principalId as string;

            stompDispatcher.on(APP_INBOX__ON_INIT_ITEMS_LOADING, (isLoading: boolean) =>
                setInboxLoading(isLoading));

            stompDispatcher.on(APP_INBOX__ON_INIT_ITEMS_RECEIVED, (inboxItems: InboxItemReceiveDto[]) => {
                setInboxLoading(false);
                setInboxItems(sortInboxItems(inboxItems));
                setNrUnread(countUnreadMessages(principalId, inboxItems));
            });

            stompDispatcher.on(APP_INBOX__ON_INBOX_UPDATE_RECEIVED, (inboxItem: InboxItemReceiveDto) => {
                let updatedInboxItems = rebuildInbox(inboxItem, inboxItems);
                setInboxItems(updatedInboxItems);
                setNrUnread(countUnreadMessages(principalId, updatedInboxItems));

                if (principalId !== inboxItem.fromUserId)
                    infoToast(`Message received from ${ inboxItem.fromNickName }`);
            });

            appDispatcher.on(APP_INBOX__ITEM_READ, (partnerId: string) => {
                const updatedItems = resetCounterForPartner(inboxItems, partnerId);
                setInboxItems(updatedItems);
                setNrUnread(countUnreadMessages(principalId, inboxItems));
            });
        }

        return function cleanUp() {
            stompDispatcher.remove(APP_INBOX__ON_INIT_ITEMS_LOADING);
            stompDispatcher.remove(APP_INBOX__ON_INIT_ITEMS_RECEIVED);
            stompDispatcher.remove(APP_INBOX__ON_INBOX_UPDATE_RECEIVED);
            appDispatcher.remove(APP_INBOX__ITEM_READ);
        }
    }, [authState?.principalId, inboxItems, nrUnread]);


    return (
        <AppInboxButton
            authState={ authState }
            inboxLoading={ inboxLoading }
            inboxItems={ inboxItems }
            nrUnread={ nrUnread }
        />
    );
}

export default AppInboxButtonHoc;
