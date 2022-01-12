import ChatRoomUserReceiveDto from "../../../../../service/stomp/receive/ChatRoomUserReceiveDto";
import {FC} from "react";
import {List, ListIcon, ListItem} from "@chakra-ui/react";
import {FaUser} from "react-icons/fa";


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
                connectedUsers.map((user, index) => {
                    return (
                        <ListItem key={`user-${index}`}>
                            <ListIcon as={FaUser} color='green.500' />
                            { user.nickName }
                        </ListItem>
                    )
                })
            }
        </List>
    );
}

export default ConnectedUsers;
