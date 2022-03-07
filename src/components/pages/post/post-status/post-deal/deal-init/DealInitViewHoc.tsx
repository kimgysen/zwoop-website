import React, {FC, useState} from "react";
import Card from "@components/layout/components/card/Card";
import NextLink from "next/link";
import {Flex, Link, Text, useDisclosure} from "@chakra-ui/react";
import AuthState from "@models/auth/AuthState";
import CancelDealModal from "@components/pages/post/post-status/post-deal/deal-init/modal/CancelDealModal";
import ApiResult from "@api_clients/type/ApiResult";
import {cancelDealApi} from "@api_clients/feature/deal/DealApiClient";
import {isOp} from "../../../../../../util/PostUtil";
import DealDto from "@models/dto/rest/receive/deal/DealDto";
import PostDto from "@models/dto/rest/receive/post/PostDto";


interface AcceptedBiddingViewProps {
    authState: AuthState,
    postDto: PostDto,
    dealDto: DealDto
}

const DealInitViewHoc: FC<AcceptedBiddingViewProps> = ({ authState, postDto, dealDto }) => {

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
                dealId={ dealDto?.dealId }
                cancelDeal={ handleCancelDeal }
                cancelDealResult={ cancelDealResult }
            />
        </Card>
    )
}

export default DealInitViewHoc;
