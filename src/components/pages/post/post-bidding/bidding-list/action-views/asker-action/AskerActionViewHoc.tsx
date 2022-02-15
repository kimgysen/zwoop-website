import {Flex} from "@chakra-ui/layout/src/flex";
import {IconButton, Tooltip, useDisclosure} from "@chakra-ui/react";
import {FaGavel} from "react-icons/fa";
import React, {FC, useState} from "react";
import {KeyedMutator} from "swr";
import Bidding from "@models/post/bidding/Bidding";
import ApiResult from "@api_clients/type/ApiResult";
import AcceptBiddingModal
    from "@components/pages/post/post-bidding/bidding-list/action-views/asker-action/modal/AcceptBiddingModal";
import Post from "@models/post/Post";
import {acceptBidding} from "@components/pages/post/post-bidding/bidding-list/action-views/asker-action/AskerActionViewHocHelper";


interface AskerActionViewHocProps {
    principalId: string,
    post: Post,
    biddingItem: Bidding,
    mutate: KeyedMutator<Bidding[]>
}

const AskerActionViewHoc: FC<AskerActionViewHocProps> = ({ principalId, post, biddingItem, mutate }) => {

    const defaultResult = { loading: false, success: null, error: null };
    const { isOpen: isAcceptModalOpen, onOpen: onAcceptModalOpen, onClose: onAcceptModalClose } = useDisclosure();
    const [acceptResult, setAcceptResult] = useState<ApiResult<boolean>>(defaultResult);


    const handleAcceptBidding = async (postId: string, biddingId: string) => {
        setAcceptResult({ ...defaultResult, loading: true });
        const res = await acceptBidding({ postId, biddingId });
        setAcceptResult(res);
        onAcceptModalClose();
        await mutate();
    }

    return (
        <Flex gap='5px'>
            <Tooltip hasArrow label="Accept ask" bg="gray.100" color="black">
                <IconButton as='span'
                            w='5%'
                            variant={'ghost'}
                            onClick={ onAcceptModalOpen }
                            colorScheme='teal'
                            aria-label="Accept bidding"
                            icon={<FaGavel />}
                />
            </Tooltip>
            <AcceptBiddingModal
                isOpen={ isAcceptModalOpen }
                onClose={ onAcceptModalClose }
                post={ post }
                biddingItem={ biddingItem }
                acceptBidding={ handleAcceptBidding }
                acceptResult={ acceptResult } />
        </Flex>
    )
}

export default AskerActionViewHoc;
