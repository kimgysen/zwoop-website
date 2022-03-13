import UserDto from "@models/dto/domain-client-dto/user/UserDto";

export default interface UserNotificationDto {
    userNotificationId: string;
    notificationType: string;
    notificationText: string;
    sender: UserDto;
    isRead: boolean;
    metaInfo: string;
    redirectParam: string;
    notificationDate: Date;
}
