import React, {FC, useState} from "react";
import Card from "@components/layout/components/card/Card";
import NextLink from "next/link";
import {Flex, Link, Text, useDisclosure} from "@chakra-ui/react";
import AuthState from "@models/auth/AuthState";
import CancelDealModal from "@components/pages/post/post-status/post-deal/deal-init/modal/CancelDealModal";
import ApiResult from "@api_clients/type/ApiResult";
import {cancelDealApi} from "@api_clients/feature/deal/DealApiClient";
import {isOp} from "../../../../../../util/PostUtil";
import DealDto from "@models/dto/domain-client-dto/deal/DealDto";
import PostDto from "@models/dto/domain-client-dto/post/PostDto";
import {
    APP_DEAL_BOX__DEAL_CANCELLED,
    POST_STATUS__DEAL_CANCELLED,
    POST_STEPPER__DEAL_CANCELLED,
    POST_VIEW__DEAL_CANCELLED
} from "../../../../../../event_dispatchers/config/StompEvents";
import {dispatchCustomMessage} from "../../../../../../service/stomp/subscriptions/SubscriptionUtil";


interface AcceptedBiddingViewProps {
    authState: AuthState,
    postDto: PostDto,
    dealDto: DealDto
}


const DealInitViewHoc: FC<AcceptedBiddingViewProps> = ({ authState, postDto, dealDto }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const defaultResult = { loading: false, success: null, error: null };
    const [cancelDealResult, setCancelDealResult] = useState<ApiResult<DealDto>>(defaultResult);

    const handleCancelDeal = async (dealDto: DealDto) => {
        setCancelDealResult({ ...defaultResult, loading: true });
        const res = await cancelDealApi(dealDto?.dealId);
        setCancelDealResult(res);

        if (res?.success) {
            onClose();
            dispatchCustomMessage(POST_VIEW__DEAL_CANCELLED, dealDto);
            dispatchCustomMessage(POST_STATUS__DEAL_CANCELLED, dealDto);
            dispatchCustomMessage(POST_STEPPER__DEAL_CANCELLED, dealDto);
            dispatchCustomMessage(APP_DEAL_BOX__DEAL_CANCELLED, dealDto);
        }
    }

    return (
        <Card>
            <Flex
                justifyContent='space-between'
            >
                <Text>
                    <b>
                        <NextLink href={`/user/${ dealDto?.consultant?.userId }`} passHref>
                            <Link>{ dealDto?.consultant?.nickName }</Link>
                        </NextLink>
                    </b> was assigned.<br />
                </Text>
                {
                    isOp(authState, postDto)
                    && (
                        <Link
                            fontSize={'sm'}
                            fontWeight={500}
                            color={ 'gray.400' }
                            onClick={ onOpen }
                            _hover={{
                                textDecoration: 'underline'
                            }}>
                            Cancel deal
                        </Link>
                    )
                }
            </Flex>
            <CancelDealModal
                isOpen={ isOpen }
                onClose={ onClose }
                dealDto={ dealDto }
                cancelDeal={ handleCancelDeal }
                cancelDealResult={ cancelDealResult }
            />
        </Card>
    )
}

export default DealInitViewHoc;
