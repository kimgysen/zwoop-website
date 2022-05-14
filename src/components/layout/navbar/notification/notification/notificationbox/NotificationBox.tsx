import AuthState from "@models/auth/AuthState";
import UserNotificationDto from "@models/dto/domain-client-dto/usernotification/UserNotificationDto";
import {FC} from "react";
import NotificationBoxLoading
    from "@components/layout/navbar/notification/notification/notificationbox/fallbackviews/NotificationBoxLoading";
import {isNotificationsBoxEmpty} from "@components/layout/navbar/notification/notification/notificationbox/NotificationHelper";
import NotificationBoxEmpty
    from "@components/layout/navbar/notification/notification/notificationbox/fallbackviews/NotificationBoxEmpty";
import {Box} from "@chakra-ui/layout/src/box";
import NotificationBoxItem
    from "@components/layout/navbar/notification/notification/notificationbox/NotificationBoxItem";

interface NotificationBoxProps {
    authState: AuthState,
    notificationBoxLoading: boolean,
    notificationDtoList?: UserNotificationDto[] | null,
    closePopup: () => void
}

const NotificationBox: FC<NotificationBoxProps> = ({ authState, notificationBoxLoading, notificationDtoList, closePopup }) => {
    return (
        <>
            {
                notificationBoxLoading
                && <NotificationBoxLoading />
            }
            {
                !notificationBoxLoading
                && isNotificationsBoxEmpty(notificationDtoList)
                && <NotificationBoxEmpty />
            }
            {
                !notificationBoxLoading
                && !isNotificationsBoxEmpty(notificationDtoList)
                && notificationDtoList?.map((notificationDto, idx) => (
                    <Box key={`notificationBoxItem-${ idx }`}
                         textAlign='left'
                    >
                        <NotificationBoxItem
                            authState={ authState }
                            notificationDto={ notificationDto }
                            closePopup={ closePopup }
                        />
                    </Box>
                ))
            }
        </>
    )
}

export default NotificationBox;
