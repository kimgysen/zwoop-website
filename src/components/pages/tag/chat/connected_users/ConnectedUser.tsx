import {FC} from "react";
import {ListIcon, ListItem} from "@chakra-ui/react";
import {FaUser} from "react-icons/fa";


interface ConnectedUserProps {
    nickName: string
}

const ConnectedUser: FC<ConnectedUserProps> = ({ nickName }) => {
    return (
        <ListItem>
            <ListIcon as={FaUser} color='green.500' />
            { nickName }
        </ListItem>
    )
}

export default ConnectedUser;
