import {Flex} from "@chakra-ui/layout/src/flex";
import {IconButton, Tooltip} from "@chakra-ui/react";
import {FaGavel} from "react-icons/fa";
import React, {FC, useState} from "react";
import {KeyedMutator} from "swr";
import Bidding from "@models/post/bidding/Bidding";
import ApiResult from "@api_clients/type/ApiResult";


interface AskerActionViewHocProps {
    principalId: string,
    biddingItem: Bidding,
    mutate: KeyedMutator<Bidding[]>
}

const AskerActionViewHoc: FC<AskerActionViewHocProps> = ({ principalId, biddingItem, mutate }) => {

    const defaultResult = { loading: false, success: null, error: null };
    const [acceptResult, setAcceptResult] = useState<ApiResult<boolean>>(defaultResult);


    return (
        <Flex gap='5px'>
            <Tooltip hasArrow label="Accept ask" bg="gray.100" color="black">
                <IconButton as='span'
                            w='5%'
                            variant={'ghost'}
                            onClick={ () => {} }
                            colorScheme='teal'
                            aria-label="Accept bidding"
                            icon={<FaGavel />}
                />
            </Tooltip>
        </Flex>
    )
}

export default AskerActionViewHoc;
