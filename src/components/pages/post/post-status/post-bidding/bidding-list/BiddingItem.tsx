import React, {FC} from "react";
import Bidding from "@models/db/entity/Bidding";
import {Link, Td, Text, Tr} from "@chakra-ui/react";
import OpActionViewHoc
    from "@components/pages/post/post-status/post-bidding/bidding-list/action-views/op-action/OpActionViewHoc";
import NextLink from "next/link";
import Post from "@models/db/entity/Post";
import BidderActionViewHoc
    from "@components/pages/post/post-status/post-bidding/bidding-list/action-views/bidder-action/BidderActionViewHoc";
import {KeyedMutator} from "swr";
import {isOp, isPostBiddingConsultant} from "../../../../../../util/PostUtil";
import AuthState from "@models/auth/AuthState";


interface BiddingItemProps {
    authState: AuthState,
    post: Post,
    biddingItem: Bidding,
    mutate: KeyedMutator<Bidding[]>
}

const BiddingItem: FC<BiddingItemProps> = ({ authState, post, biddingItem, mutate }) => {

    return (
        <Tr>
            <Td bg={ 'white' }
            >
                { biddingItem.askPrice }
            </Td>
            <Td fontSize='sm'
                bg={ 'white' }
            >
                <NextLink href={`/user/${ biddingItem?.consultant?.userId }`} passHref>
                    <Link>
                        <Text isTruncated>
                            { biddingItem?.consultant?.nickName }
                        </Text>
                    </Link>
                </NextLink>
            </Td>
            <Td>
                {
                    isPostBiddingConsultant(authState, biddingItem)
                    && (
                        <BidderActionViewHoc
                            authState={ authState }
                            post={ post }
                            biddingItem={ biddingItem }
                            mutate={ mutate }
                        />
                    )
                }
                {
                    isOp(authState, post)
                    && (
                        <OpActionViewHoc
                            authState={ authState }
                            post={ post }
                            biddingItem={ biddingItem }
                            mutate={ mutate }
                        />
                    )
                }
            </Td>
        </Tr>
    )
}

export default BiddingItem;
