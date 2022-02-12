import React, {FC} from "react";
import Bidding from "@models/post/bidding/Bidding";
import BiddingItem from "@components/pages/post/post-bidding/bidding-list/BiddingItem";
import {Table, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import Post from "@models/post/Post";
import {KeyedMutator} from "swr";

interface BiddingListProps {
    principalId: string,
    post: Post,
    biddingList: Bidding[],
    mutate: KeyedMutator<Bidding[]>
}


const BiddingList: FC<BiddingListProps> = ({ principalId, post, biddingList, mutate }) => {
    return (
        <Table size="sm" variant="simple">
            <Thead>
                <Tr>
                    <Th>Ask</Th>
                    <Th>User</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    biddingList?.map((biddingItem, idx) => (
                        <BiddingItem
                            key={ `bidding-${ idx }` }
                            principalId={ principalId }
                            post={ post }
                            biddingItem={ biddingItem }
                            mutate={ mutate }
                        />
                    ))
                }
            </Tbody>
        </Table>
    )
}

export default BiddingList;
