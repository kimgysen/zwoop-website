import React, {FC} from "react";
import Bidding from "@models/post/bidding/Bidding";
import {Link, Td, Text, Tr} from "@chakra-ui/react";
import AskerActionViewHoc
    from "@components/pages/post/post-bidding/bidding-list/action-views/asker-action/AskerActionViewHoc";
import NextLink from "next/link";
import Post from "@models/post/Post";
import BidderActionViewHoc
    from "@components/pages/post/post-bidding/bidding-list/action-views/bidder-action/BidderActionViewHoc";
import {KeyedMutator} from "swr";

interface BiddingItemProps {
    principalId: string,
    post: Post,
    biddingItem: Bidding,
    mutate: KeyedMutator<Bidding[]>
}


const BiddingItem: FC<BiddingItemProps> = ({ principalId, post, biddingItem, mutate }) => {
    return (
        <Tr>
            <Td>
                { biddingItem.askPrice }
            </Td>
            <Td fontSize='sm'>
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
                    biddingItem.respondent.userId === principalId
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
                    biddingItem.post.asker.userId === principalId
                    && <AskerActionViewHoc />
                }
            </Td>
        </Tr>
    )
}

export default BiddingItem;
