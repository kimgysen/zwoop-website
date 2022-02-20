import React, {FC} from "react";
import DealOpenedDto from "../../../../../../service/stomp/dto/receive/notification/feature/deal/DealOpenedDto";
import {useRouter} from "next/router";
import {Box} from "@chakra-ui/layout/src/box";


interface DealBoxItemProps {
    deal: DealOpenedDto,
    closePopup: () => void
}

const DealBoxItem: FC<DealBoxItemProps> = ({ deal, closePopup }) => {

    const router = useRouter();

    const handleClickDealBoxDetail = async () => {
        await router.push(`/post/${ deal?.postId }`);
        closePopup();
    }

    return (
        <Box
            p='5px'
            py='15px'
            _hover={{background: 'blue.50' }}
            onClick={ handleClickDealBoxDetail }
            cursor='pointer'
        >
            { deal?.postTitle }
        </Box>
    )

}

export default DealBoxItem;

