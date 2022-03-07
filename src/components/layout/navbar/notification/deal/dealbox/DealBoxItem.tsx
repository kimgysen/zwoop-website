import React, {FC} from "react";
import {useRouter} from "next/router";
import {Box} from "@chakra-ui/layout/src/box";
import DealDto from "@models/dto/rest/receive/deal/DealDto";


interface DealBoxItemProps {
    dealDto: DealDto,
    closePopup: () => void
}

const DealBoxItem: FC<DealBoxItemProps> = ({ dealDto, closePopup }) => {

    const router = useRouter();

    const handleClickDealBoxDetail = async () => {
        closePopup();
        await router.push(`/post/${ dealDto?.postId }`);
    }

    return (
        <Box
            p='5px'
            py='15px'
            _hover={{background: 'blue.50' }}
            onClick={ handleClickDealBoxDetail }
            cursor='pointer'
        >
            { dealDto?.postTitle }
        </Box>
    )

}

export default DealBoxItem;

