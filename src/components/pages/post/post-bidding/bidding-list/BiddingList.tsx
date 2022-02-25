import React, {FC} from "react";
import Bidding from "@models/db/entity/Bidding";
import BiddingItem from "@components/pages/post/post-bidding/bidding-list/BiddingItem";
import {Table, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import Post from "@models/db/entity/Post";
import {KeyedMutator} from "swr";
import {PostStatusEnum} from "@models/db/entity/PostStatus";
import Deal from "@models/db/entity/Deal";
import AuthState from "@models/auth/AuthState";

interface BiddingListProps {
    authState: AuthState,
    post: Post,
    postStatus: PostStatusEnum,
    biddingList: Bidding[],
    mutate: KeyedMutator<Bidding[]>,
    deal?: Deal|null
}


const BiddingList: FC<BiddingListProps> = ({ authState, post, postStatus, biddingList, deal, mutate }) => {
    return (
        <Table
            size="sm"
            variant="simple"
            color={ deal ? 'gray.400' : 'black' }

        >
            <Thead>
                <Tr>
                    <Th>Ask</Th>
                    <Th>User</Th>
                    {
                        !deal && <Th>Actions</Th>
                    }
                </Tr>
            </Thead>
            <Tbody>
                {
                    biddingList?.map((biddingItem, idx) => (
                        <BiddingItem
                            key={ `bidding-${ idx }` }
                            authState={ authState }
                            post={ post }
                            postStatus={ postStatus }
                            biddingItem={ biddingItem }
                            deal={ deal }
                            mutate={ mutate }
                        />
                    ))
                }
            </Tbody>
        </Table>
    )
}

export default BiddingList;
