import React, {FC} from "react";
import {useRouter} from "next/router";
import {Avatar, Box, Flex, Text} from "@chakra-ui/react";
import DealDto from "@models/dto/domain-client-dto/deal/DealDto";
import {isDealOp} from "../../../../../../util/DealUtil";
import AuthState from "@models/auth/AuthState";


interface DealBoxItemProps {
    authState: AuthState,
    dealDto: DealDto,
    closePopup: () => void
}

const DealBoxItem: FC<DealBoxItemProps> = ({ authState, dealDto, closePopup }) => {

    const router = useRouter();

    const handleClickDealBoxDetail = async () => {
        closePopup();
        await router.push(`/post/${ dealDto?.postId }`);
    }

    return (
        <Flex
            p='5px'
            py='15px'
            _hover={{background: 'blue.50' }}
            onClick={ handleClickDealBoxDetail }
            cursor='pointer'
        >
            <Box pr={'10px'}>
                <Avatar
                    name={ dealDto?.consultant?.nickName }
                    src={ dealDto?.consultant?.avatar }
                />
            </Box>
            <Box>
                <Text>
                    Deal with&nbsp;
                    <b>
                        {
                            isDealOp(authState, dealDto)
                            ? dealDto?.consultant?.nickName
                            : dealDto?.op.nickName
                        }
                    </b>:
                </Text>
                <Text>
                    { dealDto?.postTitle }
                </Text>
            </Box>
        </Flex>
    )

}

export default DealBoxItem;

