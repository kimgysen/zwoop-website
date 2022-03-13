import {Flex} from "@chakra-ui/layout/src/flex";
import {IconButton, Tooltip, useDisclosure} from "@chakra-ui/react";
import {FaComment, FaGavel} from "react-icons/fa";
import React, {FC, useState} from "react";
import ApiResult from "@api_clients/type/ApiResult";
import CreateDealModal
    from "@components/pages/post/post-status/post-bidding/bidding-list/action-views/op-action/modal/CreateDealModal";
import {useRouter} from "next/router";
import {createDealApi} from "@api_clients/feature/deal/DealApiClient";
import AuthState from "@models/auth/AuthState";
import BiddingDto from "@models/dto/domain-client-dto/bidding/BiddingDto";
import DealDto from "@models/dto/domain-client-dto/deal/DealDto";
import PostDto from "@models/dto/domain-client-dto/post/PostDto";
import {dispatchCustomMessage} from "../../../../../../../../service/stomp/subscriptions/SubscriptionUtil";
import {
    APP_DEAL_BOX__DEAL_INIT,
    POST_STATUS__DEAL_INIT,
    POST_STEPPER__DEAL_INIT,
    POST_VIEW__DEAL_INIT
} from "../../../../../../../../event_dispatchers/config/StompEvents";


interface OpActionViewHocProps {
    authState: AuthState,
    postDto: PostDto,
    biddingDto: BiddingDto
}

const OpActionViewHoc: FC<OpActionViewHocProps> = ({ authState, postDto, biddingDto }) => {

    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const defaultResult = { loading: false, success: null, error: null };
    const [createDealResult, setCreateDealResult] = useState<ApiResult<DealDto>>(defaultResult);


    const handleChat = async () => {
        await router.push(`/post/${postDto?.postId}?partnerId=${ biddingDto?.consultant?.userId }`);
    }

    const createDeal = async (biddingId: string) => {
        setCreateDealResult({ ...defaultResult, loading: true });
        const res = await createDealApi({ biddingId });
        setCreateDealResult(res);

        if (res?.success) {
            onClose();
            dispatchCustomMessage(POST_VIEW__DEAL_INIT, res?.success as DealDto);
            dispatchCustomMessage(POST_STATUS__DEAL_INIT, res?.success as DealDto);
            dispatchCustomMessage(POST_STEPPER__DEAL_INIT, res?.success as DealDto);
            dispatchCustomMessage(APP_DEAL_BOX__DEAL_INIT, res?.success as DealDto);
        }
    }

    return (
        <Flex gap='5px'>
            <Tooltip hasArrow label={`Chat with ${ biddingDto?.consultant?.nickName }`} bg="gray.100" color="black">
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
                biddingDto={ biddingDto }
                createDeal={ createDeal }
                createDealResult={ createDealResult } />
        </Flex>
    )
}

export default OpActionViewHoc;
