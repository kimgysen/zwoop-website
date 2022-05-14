import React, {FC} from "react";
import {useRouter} from "next/router";
import {Avatar, Box, Flex, Text} from "@chakra-ui/react";
import AuthState from "@models/auth/AuthState";
import UserNotificationDto from "@models/dto/domain-client-dto/usernotification/UserNotificationDto";


interface NotificationItemProps {
    authState: AuthState,
    notificationDto: UserNotificationDto,
    closePopup: () => void
}

const NotificationBoxItem: FC<NotificationItemProps> = ({ authState, notificationDto, closePopup }) => {

    const router = useRouter();

    const handleClickNotificationItem = async () => {
        closePopup();
        await router.push(`/post/${ notificationDto?.redirectParam }`);
    }

    return (
        <Flex
            p='5px'
            py='15px'
            _hover={{background: 'blue.50' }}
            onClick={ handleClickNotificationItem }
            cursor='pointer'
        >
            <Box pr={'10px'}>
                <Avatar
                    name={ notificationDto?.sender?.nickName }
                    src={ notificationDto?.sender?.avatar }
                />
            </Box>
            <Box>
                <Text>
                    { notificationDto?.notificationText }
                </Text>
            </Box>
        </Flex>
    )

}

export default NotificationBoxItem;

