import React, {FC} from "react";
import DealInitDto from "@models/dto/stomp/receive/dealbox/DealInitDto";
import {useRouter} from "next/router";
import {Box} from "@chakra-ui/layout/src/box";


interface DealBoxItemProps {
    deal: DealInitDto,
    closePopup: () => void
}

const DealBoxItem: FC<DealBoxItemProps> = ({ deal, closePopup }) => {

    const router = useRouter();

    const handleClickDealBoxDetail = async () => {
        closePopup();
        await router.push(`/post/${ deal?.postId }`);
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

