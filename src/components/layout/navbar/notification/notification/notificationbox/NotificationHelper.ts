import UserNotificationDto from "@models/dto/domain-client-dto/usernotification/UserNotificationDto";

export const isNotificationsBoxEmpty = (notifications?: UserNotificationDto[] | null) =>
    !notifications || notifications?.length === 0;

export const addNotification = (notificationDtoList: UserNotificationDto[] | null, notificationDto: UserNotificationDto) =>
    notificationDtoList
        ? [notificationDto, ...notificationDtoList]
        : [notificationDto];

export const isLastNotificationItem = (notificationDtoList: UserNotificationDto[], idx: number) =>
    notificationDtoList.length - 1 === idx;

