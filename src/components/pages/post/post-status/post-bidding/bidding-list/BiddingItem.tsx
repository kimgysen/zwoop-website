import React, {FC} from "react";
import {Link, Td, Text, Tr} from "@chakra-ui/react";
import OpActionViewHoc
    from "@components/pages/post/post-status/post-bidding/bidding-list/action-views/op-action/OpActionViewHoc";
import NextLink from "next/link";
import BidderActionViewHoc
    from "@components/pages/post/post-status/post-bidding/bidding-list/action-views/bidder-action/BidderActionViewHoc";
import {isOp, isPostBiddingConsultant} from "../../../../../../util/PostUtil";
import AuthState from "@models/auth/AuthState";
import BiddingDto from "@models/dto/rest/receive/bidding/BiddingDto";
import PostDto from "@models/dto/rest/receive/post/PostDto";


interface BiddingItemProps {
    authState: AuthState,
    postDto: PostDto,
    biddingDto: BiddingDto
}

const BiddingItem: FC<BiddingItemProps> = ({ authState, postDto, biddingDto }) => {

    return (
        <Tr>
            <Td bg={ 'white' }
            >
                { biddingDto?.askPrice }
            </Td>
            <Td fontSize='sm'
                bg={ 'white' }
            >
                <NextLink href={`/user/${ biddingDto?.consultant?.userId }`} passHref>
                    <Link>
                        <Text isTruncated>
                            { biddingDto?.consultant?.nickName }
                        </Text>
                    </Link>
                </NextLink>
            </Td>
            <Td>
                {
                    isPostBiddingConsultant(authState, biddingDto)
                    && (
                        <BidderActionViewHoc
                            authState={ authState }
                            biddingDto={ biddingDto }
                        />
                    )
                }
                {
                    isOp(authState, postDto)
                    && (
                        <OpActionViewHoc
                            authState={ authState }
                            postDto={ postDto }
                            biddingDto={ biddingDto }
                        />
                    )
                }
            </Td>
        </Tr>
    )
}

export default BiddingItem;
