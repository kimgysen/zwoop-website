import React, {FC} from "react";
import Bidding from "@models/post/bidding/Bidding";
import BiddingItem from "@components/pages/post/post-bidding/bidding-list/BiddingItem";
import {Table, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import Post, {PostStatusEnum} from "@models/post/Post";
import {KeyedMutator} from "swr";
import BiddingAcceptedDto from "../../../../../service/stomp/dto/receive/post/feature/BiddingAcceptedDto";

interface BiddingListProps {
    principalId: string,
    post: Post,
    postStatus: PostStatusEnum,
    biddingList: Bidding[],
    acceptedBidding: BiddingAcceptedDto|null,
    mutate: KeyedMutator<Bidding[]>
}


const BiddingList: FC<BiddingListProps> = ({ principalId, post, postStatus, biddingList, acceptedBidding, mutate }) => {
    return (
        <Table
            size="sm"
            variant="simple"
            color={ acceptedBidding ? 'gray.400' : 'black' }

        >
            <Thead>
                <Tr>
                    <Th>Ask</Th>
                    <Th>User</Th>
                    {
                        !acceptedBidding && <Th>Actions</Th>
                    }
                </Tr>
            </Thead>
            <Tbody>
                {
                    biddingList?.map((biddingItem, idx) => (
                        <BiddingItem
                            key={ `bidding-${ idx }` }
                            principalId={ principalId }
                            post={ post }
                            postStatus={ postStatus }
                            biddingItem={ biddingItem }
                            acceptedBidding={ acceptedBidding }
                            mutate={ mutate }
                        />
                    ))
                }
            </Tbody>
        </Table>
    )
}

export default BiddingList;
