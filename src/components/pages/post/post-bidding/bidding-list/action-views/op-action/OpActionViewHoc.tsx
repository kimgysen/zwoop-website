import {Flex} from "@chakra-ui/layout/src/flex";
import {IconButton, Tooltip, useDisclosure} from "@chakra-ui/react";
import {FaComment, FaGavel} from "react-icons/fa";
import React, {FC, useState} from "react";
import {KeyedMutator} from "swr";
import Bidding from "@models/db/entity/Bidding";
import ApiResult from "@api_clients/type/ApiResult";
import CreateDealModal
    from "@components/pages/post/post-bidding/bidding-list/action-views/op-action/modal/CreateDealModal";
import Post from "@models/db/entity/Post";
import {useRouter} from "next/router";
import {createDealApi} from "@api_clients/feature/deal/DealApiClient";
import AuthState from "@models/auth/AuthState";


interface OpActionViewHocProps {
    authState: AuthState,
    post: Post,
    biddingItem: Bidding,
    mutate: KeyedMutator<Bidding[]>
}

const OpActionViewHoc: FC<OpActionViewHocProps> = ({ authState, post, biddingItem, mutate }) => {

    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const defaultResult = { loading: false, success: null, error: null };
    const [createDealResult, setCreateDealResult] = useState<ApiResult<boolean>>(defaultResult);


    const handleChat = () => {
        router.push(`/post/${post?.postId}?partnerId=${ biddingItem?.consultant?.userId }`);
    }

    const createDeal = async (biddingId: string) => {
        setCreateDealResult({ ...defaultResult, loading: true });
        const res = await createDealApi({ biddingId });
        setCreateDealResult(res);
        onClose();
        await mutate();
    }

    return (
        <Flex gap='5px'>
            <Tooltip hasArrow label={`Chat with ${ biddingItem?.consultant?.nickName }`} bg="gray.100" color="black">
                <IconButton as='span'
                            w='5%'
                            variant={'ghost'}
                            onClick={ handleChat }
                            colorScheme='teal'
                            aria-label="Private Chat"
                            icon={<FaComment />}
                />
            </Tooltip>
            <Tooltip hasArrow label="Accept ask" bg="gray.100" color="black">
                <IconButton as='span'
                            w='5%'
                            variant={'ghost'}
                            onClick={ onOpen }
                            colorScheme='teal'
                            aria-label="Accept bidding"
                            icon={<FaGavel />}
                />
            </Tooltip>
            <CreateDealModal
                isOpen={ isOpen }
                onClose={ onClose }
                post={ post }
                biddingItem={ biddingItem }
                createDeal={ createDeal }
                createDealResult={ createDealResult } />
        </Flex>
    )
}

export default OpActionViewHoc;
