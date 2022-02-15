import BiddingAcceptedDto from "../../../../../service/stomp/dto/receive/post/feature/BiddingAcceptedDto";
import React, {FC} from "react";
import Card from "@components/layout/components/card/Card";
import NextLink from "next/link";
import {Link} from "@chakra-ui/react";


interface AcceptedBiddingViewProps {
    biddingAcceptedDto: BiddingAcceptedDto
}

const AcceptedBiddingView: FC<AcceptedBiddingViewProps> = ({ biddingAcceptedDto }) => {
    return (
        <Card>
            <b>
                <NextLink href={`/user/${ biddingAcceptedDto?.userId }`} passHref>
                    <Link>{ biddingAcceptedDto?.nickName }</Link>
                </NextLink>
            </b> is helping the OP.<br />
        </Card>
    )
}

export default AcceptedBiddingView;
