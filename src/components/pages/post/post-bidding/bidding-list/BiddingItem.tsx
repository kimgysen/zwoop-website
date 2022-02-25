import React, {FC} from "react";
import Bidding from "@models/db/entity/Bidding";
import {Link, Td, Text, Tr} from "@chakra-ui/react";
import OpActionViewHoc from "@components/pages/post/post-bidding/bidding-list/action-views/op-action/OpActionViewHoc";
import NextLink from "next/link";
import Post from "@models/db/entity/Post";
import BidderActionViewHoc
    from "@components/pages/post/post-bidding/bidding-list/action-views/bidder-action/BidderActionViewHoc";
import {KeyedMutator} from "swr";
import {PostStatusEnum} from "@models/db/entity/PostStatus";
import Deal from "@models/db/entity/Deal";
import {isBiddingConsultant, isOp} from "../../../../../util/PostUtil";
import AuthState from "@models/auth/AuthState";


interface BiddingItemProps {
    authState: AuthState,
    post: Post,
    postStatus: PostStatusEnum,
    biddingItem: Bidding,
    mutate: KeyedMutator<Bidding[]>,
    deal?: Deal|null,
}

const BiddingItem: FC<BiddingItemProps> = ({ authState, post, postStatus, biddingItem, deal, mutate }) => {

    const isSelectedUser = deal?.bidding?.consultant?.userId === biddingItem?.consultant?.userId;

    return (
        <Tr>
            <Td bg={ isSelectedUser ? 'yellow.100' : 'white' }
            >
                { biddingItem.askPrice }
            </Td>
            <Td fontSize='sm'
                bg={ isSelectedUser ? 'yellow.100' : 'white' }
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
                    postStatus === PostStatusEnum.POST_INIT
                    && isBiddingConsultant(authState, biddingItem)
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
                    postStatus === PostStatusEnum.POST_INIT
                    && isOp(authState, post)
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
