import BiddingAcceptedDto from "../../../../../service/stomp/dto/receive/post/feature/bidding/BiddingAcceptedDto";
import React, {FC, useState} from "react";
import Card from "@components/layout/components/card/Card";
import NextLink from "next/link";
import {Flex, Link, Text, useDisclosure} from "@chakra-ui/react";
import AuthState from "@models/user/AuthState";
import Post from "@models/post/Post";
import {isPostOwner} from "@components/pages/post/post-bidding/BiddingViewHelper";
import UnAcceptBiddingModal from "@components/pages/post/post-bidding/accepted-bidding/modal/UnAcceptBiddingModal";
import ApiResult from "@api_clients/type/ApiResult";
import {unAcceptBidding} from "@components/pages/post/post-bidding/accepted-bidding/AcceptedBiddingViewHelper";
import {KeyedMutator} from "swr";
import Bidding from "@models/post/bidding/Bidding";


interface AcceptedBiddingViewProps {
    authState: AuthState,
    post: Post,
    biddingAcceptedDto: BiddingAcceptedDto,
    mutate: KeyedMutator<Bidding[]>
}

const AcceptedBiddingViewHoc: FC<AcceptedBiddingViewProps> = ({ authState, post, biddingAcceptedDto, mutate }) => {

    const { isOpen: isUnAssignModalOpen, onOpen: onUnAssignModalOpen, onClose: onUnAssignModalClose} = useDisclosure();

    const defaultResult = { loading: false, success: null, error: null };
    const [unAcceptResult, setUnAcceptResult] = useState<ApiResult<boolean>>(defaultResult);

    const handleUnAcceptBidding = async (postId: string, biddingId: string) => {
        setUnAcceptResult({ ...defaultResult, loading: true });
        const res = await unAcceptBidding({ postId, biddingId });
        setUnAcceptResult(res);
        onUnAssignModalClose();
        await mutate();
    }

    return (
        <Card>
            <Flex
                justifyContent='space-between'
            >
                <Text>
                    <b>
                        <NextLink href={`/user/${ biddingAcceptedDto?.userId }`} passHref>
                            <Link>{ biddingAcceptedDto?.nickName }</Link>
                        </NextLink>
                    </b> was assigned.<br />
                </Text>
                {
                    isPostOwner(post, authState.principalId)
                    && (
                        <Link
                            fontSize={'sm'}
                            fontWeight={500}
                            color={ 'gray.400' }
                            onClick={ onUnAssignModalOpen }
                            _hover={{
                                textDecoration: 'underline'
                            }}>
                            Unassign
                        </Link>
                    )
                }
            </Flex>
            <UnAcceptBiddingModal
                isOpen={ isUnAssignModalOpen }
                onClose={ onUnAssignModalClose }
                postId={ post?.postId }
                biddingId={ biddingAcceptedDto?.biddingId }
                unAcceptBidding={ handleUnAcceptBidding }
                unAcceptResult={ unAcceptResult }
            />
        </Card>
    )
}

export default AcceptedBiddingViewHoc;
