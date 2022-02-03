import {FC} from "react";
import Bidding from "@models/post/Bidding";

interface BiddingItemProps {
    biddingItem: Bidding
}


const BiddingItem: FC<BiddingItemProps> = ({ biddingItem }) => {
    return (
        <>
            {
                biddingItem.askPrice
            }
            {
                biddingItem.respondent.nickName
            }
        </>
    )
}

export default BiddingItem;
