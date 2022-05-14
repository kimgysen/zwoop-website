import {FC, useEffect, useState} from "react";
import NotificationButton from "@components/layout/navbar/notification/notification/NotificationButton";
import {getStompDispatcher} from "../../../../../event_dispatchers/StompDispatcher";
import AuthState from "@models/auth/AuthState";
import {
    getNotificationUnreadCount,
    resetNotificationCount
} from "@api_clients/feature/notification/NotificationApiClient";
import {NOTIFICATION_BUTTON__POST_NOTIFICATION} from "../../../../../event_dispatchers/config/StompEvents";


interface NotificationButtonHocProps {
    authState: AuthState
}

const stompDispatcher = getStompDispatcher();

const NotificationButtonHoc: FC<NotificationButtonHocProps> = ({ authState }) => {
    const [unreadCount, setUnreadCount] = useState<number>(0);

    useEffect(() => {
        (async() => {
            const res = await getNotificationUnreadCount();
            setUnreadCount(res?.success?.unreadCount || 0);
        })();
    }, []);

    useEffect(() => {
        if (authState?.principalId) {
            stompDispatcher.on(NOTIFICATION_BUTTON__POST_NOTIFICATION, () => {
                setUnreadCount(unreadCount + 1);
            });
        }

        return function cleanUp() {
            stompDispatcher.remove(NOTIFICATION_BUTTON__POST_NOTIFICATION);
        }
    }, [authState?.principalId]);

    const resetCount = async () => {
        const res = await resetNotificationCount();
        if (res?.success) {
            setUnreadCount(0);
        }
    }

    return (
        <NotificationButton
            authState={ authState }
            unreadCount={ unreadCount }
            resetCount={ resetCount }
        />
    )
}

export default NotificationButtonHoc;
