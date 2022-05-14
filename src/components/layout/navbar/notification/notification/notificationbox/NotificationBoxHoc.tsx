import {FC, useEffect, useState} from "react";
import AuthState from "@models/auth/AuthState";
import ApiResult from "@api_clients/type/ApiResult";
import UserNotificationDto from "@models/dto/domain-client-dto/usernotification/UserNotificationDto";
import {getNotifications} from "@api_clients/feature/notification/NotificationApiClient";
import {getStompDispatcher} from "../../../../../../event_dispatchers/StompDispatcher";
import {NOTIFICATION_DROPDOWN__POST_NOTIFICATION} from "../../../../../../event_dispatchers/config/StompEvents";
import NotificationBox from "@components/layout/navbar/notification/notification/notificationbox/NotificationBox";
import {addNotification} from "@components/layout/navbar/notification/notification/notificationbox/NotificationHelper";
import {infoToast} from "@components/widgets/toast/AppToast";

interface NotificationBoxHocProps {
    authState: AuthState
}

const stompDispatcher = getStompDispatcher();

const NotificationBoxHoc: FC<NotificationBoxHocProps> = ({ authState }) => {

    let defaultNotificationsRes = { loading: false, success: [], error: null };
    const [notificationsRes, setNotificationRes] = useState<ApiResult<UserNotificationDto[]>>(defaultNotificationsRes);

    useEffect(() => {
        (async() => {
            setNotificationRes({ ...defaultNotificationsRes, loading: true });
            const res = await getNotifications(0, 10);
            setNotificationRes(res);
        })();
        }, []);

    useEffect(() => {
        if (authState?.principalId) {
            stompDispatcher.on(NOTIFICATION_DROPDOWN__POST_NOTIFICATION, (notificationDto: UserNotificationDto) => {
                const updatedNotifications = addNotification(notificationsRes?.success, notificationDto);
                setNotificationRes({ ...defaultNotificationsRes, success: updatedNotifications });

                infoToast(notificationDto.notificationText);
            });
        }

        return function cleanUp() {
            stompDispatcher.remove(NOTIFICATION_DROPDOWN__POST_NOTIFICATION);
        }
    }, [authState?.principalId]);

    return (
        <>
            <NotificationBox
                authState={ authState }
                notificationBoxLoading={ notificationsRes?.loading}
                notificationDtoList={ notificationsRes?.success }
                closePopup={ close }
            />
        </>
    )
}

export default NotificationBoxHoc;