import React, {FC} from "react";
import Bidding from "@models/db/entity/Bidding";
import BiddingItem from "@components/pages/post/post-status/post-bidding/bidding-list/BiddingItem";
import {Table, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import Post from "@models/db/entity/Post";
import {KeyedMutator} from "swr";
import AuthState from "@models/auth/AuthState";

interface BiddingListProps {
    authState: AuthState,
    post: Post,
    biddingList: Bidding[],
    mutate: KeyedMutator<Bidding[]>
}


const BiddingList: FC<BiddingListProps> = ({ authState, post, biddingList, mutate }) => {
    return (
        <Table
            size="sm"
            variant="simple"
            color={ 'black' }

        >
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
                            authState={ authState }
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
