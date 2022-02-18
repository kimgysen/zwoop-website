import React, {FC} from "react";
import Bidding from "@models/post/bidding/Bidding";
import {Link, Td, Text, Tr} from "@chakra-ui/react";
import AskerActionViewHoc
    from "@components/pages/post/post-bidding/bidding-list/action-views/asker-action/AskerActionViewHoc";
import NextLink from "next/link";
import Post, {PostStatusEnum} from "@models/post/Post";
import BidderActionViewHoc
    from "@components/pages/post/post-bidding/bidding-list/action-views/bidder-action/BidderActionViewHoc";
import {KeyedMutator} from "swr";
import {isPostOwner, principalIsBidder} from "@components/pages/post/post-bidding/BiddingViewHelper";
import BiddingAcceptedDto from "../../../../../service/stomp/dto/receive/post/feature/bidding/BiddingAcceptedDto";


interface BiddingItemProps {
    principalId: string,
    post: Post,
    postStatus: PostStatusEnum,
    biddingItem: Bidding,
    acceptedBidding: BiddingAcceptedDto|null,
    mutate: KeyedMutator<Bidding[]>
}

const BiddingItem: FC<BiddingItemProps> = ({ principalId, post, postStatus, biddingItem, acceptedBidding, mutate }) => {

    const isSelectedUser = acceptedBidding?.userId === biddingItem?.respondent?.userId;

    return (
        <Tr>
            <Td bg={ isSelectedUser ? 'yellow.100' : 'white' }
            >
                { biddingItem.askPrice }
            </Td>
            <Td fontSize='sm'
                bg={ isSelectedUser ? 'yellow.100' : 'white' }
            >
                <NextLink href={`/user/${ biddingItem.respondent.userId }`} passHref>
                    <Link>
                        <Text isTruncated>
                            { biddingItem.respondent.nickName }
                        </Text>
                    </Link>
                </NextLink>
            </Td>
            <Td>
                {
                    postStatus === PostStatusEnum.OPEN
                    && principalIsBidder(principalId, biddingItem)
                    && (
                        <BidderActionViewHoc
                            principalId={ principalId }
                            post={ post }
                            biddingItem={ biddingItem }
                            mutate={ mutate }
                        />
                    )
                }
                {
                    postStatus === PostStatusEnum.OPEN
                    && isPostOwner(post, principalId)
                    && (
                        <AskerActionViewHoc
                            principalId={ principalId }
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
