import ChatRoomUserReceiveDto from "../../../../../models/dto/stomp/receive/public_chat/ChatRoomUserReceiveDto";
import {FC} from "react";
import {List} from "@chakra-ui/react";
import ConnectedUser from "@components/pages/tag/chat/connected_users/ConnectedUser";


interface ConnectedUsersProps {
    connectedUsers: ChatRoomUserReceiveDto[]
}

const ConnectedUsers: FC<ConnectedUsersProps> = ({ connectedUsers }) => {
    return (
        <List
            spacing={3}
            fontSize='sm'
            textAlign='left'
        >
            {
                connectedUsers.map((user, index) =>
                    (
                        <ConnectedUser
                            key={`user-${index}`}
                            nickName={ user.nickName }
                        />
                    ))
            }
        </List>
    );
}

export default ConnectedUsers;
