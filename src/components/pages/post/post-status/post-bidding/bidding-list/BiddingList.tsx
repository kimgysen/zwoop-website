import React, {FC} from "react";
import BiddingItem from "@components/pages/post/post-status/post-bidding/bidding-list/BiddingItem";
import {Table, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import AuthState from "@models/auth/AuthState";
import BiddingDto from "@models/dto/domain-client-dto/bidding/BiddingDto";
import PostDto from "@models/dto/domain-client-dto/post/PostDto";

interface BiddingListProps {
    authState: AuthState,
    postDto: PostDto,
    biddingDtoList: BiddingDto[]
}


const BiddingList: FC<BiddingListProps> = ({ authState, postDto, biddingDtoList }) => {
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
                    biddingDtoList?.map((biddingDto, idx) => (
                        <BiddingItem
                            key={ `bidding-${ idx }` }
                            authState={ authState }
                            postDto={ postDto }
                            biddingDto={ biddingDto }
                        />
                    ))
                }
            </Tbody>
        </Table>
    )
}

export default BiddingList;
