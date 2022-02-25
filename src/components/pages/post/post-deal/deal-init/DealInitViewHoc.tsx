import React, {FC, useState} from "react";
import Card from "@components/layout/components/card/Card";
import NextLink from "next/link";
import {Flex, Link, Text, useDisclosure} from "@chakra-ui/react";
import AuthState from "@models/auth/AuthState";
import Post from "@models/db/entity/Post";
import CancelDealModal from "@components/pages/post/post-deal/deal-init/modal/CancelDealModal";
import ApiResult from "@api_clients/type/ApiResult";
import {cancelDealApi} from "@api_clients/feature/deal/DealApiClient";
import {isOp} from "../../../../../util/PostUtil";
import Deal from "@models/db/entity/Deal";


interface AcceptedBiddingViewProps {
    authState: AuthState,
    post: Post,
    deal: Deal
}

const DealInitViewHoc: FC<AcceptedBiddingViewProps> = ({ authState, post, deal }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const defaultResult = { loading: false, success: null, error: null };
    const [cancelDealResult, setCancelDealResult] = useState<ApiResult<boolean>>(defaultResult);

    const handleCancelDeal = async (dealId: string) => {
        setCancelDealResult({ ...defaultResult, loading: true });
        const res = await cancelDealApi(dealId);
        setCancelDealResult(res);
        onClose();
    }

    return (
        <Card>
            <Flex
                justifyContent='space-between'
            >
                <Text>
                    <b>
                        <NextLink href={`/user/${ deal?.bidding?.consultant?.userId }`} passHref>
                            <Link>{ deal?.bidding?.consultant?.nickName }</Link>
                        </NextLink>
                    </b> was assigned.<br />
                </Text>
                {
                    isOp(authState, post)
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
                dealId={ deal?.dealId }
                cancelDeal={ handleCancelDeal }
                cancelDealResult={ cancelDealResult }
            />
        </Card>
    )
}

export default DealInitViewHoc;
