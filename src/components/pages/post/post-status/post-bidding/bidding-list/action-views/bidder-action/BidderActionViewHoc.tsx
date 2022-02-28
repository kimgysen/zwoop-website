import Post from "@models/db/entity/Post";
import Bidding from "@models/db/entity/Bidding";
import React, {FC, useState} from "react";
import {IconButton, useDisclosure} from "@chakra-ui/react";
import {Flex} from "@chakra-ui/layout/src/flex";
import {FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import EditAskPriceModal
    from "@components/pages/post/post-status/post-bidding/bidding-list/action-views/bidder-action/modal/EditAskPriceModal";
import DeleteBiddingModal
    from "@components/pages/post/post-status/post-bidding/bidding-list/action-views/bidder-action/modal/DeleteBiddingModal";
import ApiResult from "@api_clients/type/ApiResult";
import {KeyedMutator} from "swr";
import AuthState from "@models/auth/AuthState";
import {deleteBiddingApi, updateBiddingApi} from "@api_clients/feature/bidding/BiddingApiClient";


interface BidderActionViewHocProps {
    authState: AuthState,
    post: Post,
    biddingItem: Bidding,
    mutate: KeyedMutator<Bidding[]>
}

const BidderActionViewHoc: FC<BidderActionViewHocProps> = ({ authState, post, biddingItem, mutate }) => {

    const { isOpen: isEditAskOpen, onOpen: onEditAskOpen, onClose: onEditAskClose } = useDisclosure();
    const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

    const defaultResult = { loading: false, success: null, error: null };
    const [updateResult, setUpdateResult] = useState<ApiResult<boolean>>(defaultResult);
    const [deleteResult, setDeleteResult] = useState<ApiResult<boolean>>(defaultResult);

    const handleUpdateBidding = async (askPrice: string) => {
        setUpdateResult({ ...defaultResult, loading: true });
        const res = await updateBiddingApi(
            biddingItem?.biddingId, { askPrice });
        setUpdateResult(res);
        await mutate();
        onEditAskClose();
    }

    const handleDeleteBidding = async () => {
        setDeleteResult({ ...defaultResult, loading: true });
        const res = await deleteBiddingApi(biddingItem?.biddingId);
        setDeleteResult(res);
        await mutate();
        onDeleteModalClose();
    }

    return (
        <>
            <Flex gap='5px'>
                <IconButton as='span'
                            variant={'ghost'}
                            w='5%'
                            onClick={ onEditAskOpen }
                            colorScheme='teal'
                            aria-label="Edit bidding"
                            icon={<FaPencilAlt />}
                />
                <IconButton as='span'
                            variant={'ghost'}
                            w='5%'
                            onClick={ onDeleteModalOpen }
                            colorScheme='teal'
                            aria-label="Delete bidding"
                            icon={<FaTrashAlt />}
                />
            </Flex>
            <EditAskPriceModal
                defaultAskPrice={ biddingItem.askPrice }
                isOpen={ isEditAskOpen }
                onClose={ onEditAskClose }
                updateBidding={ handleUpdateBidding }
                updateResult={  updateResult }
            />
            <DeleteBiddingModal
                isOpen={ isDeleteModalOpen }
                onClose={ onDeleteModalClose }
                deleteBidding={ handleDeleteBidding }
                deleteResult={ deleteResult }
            />
        </>
    )
}

export default BidderActionViewHoc;