import {FC} from "react";
import Bidding from "@models/post/Bidding";
import BiddingItem from "@components/pages/post/post_view/subviews/bidding/BiddingItem";

interface BiddingListProps {
    biddingList: Bidding[]
}


const BiddingList: FC<BiddingListProps> = ({ biddingList }) => {
    return (
        <>
            {
                biddingList.map((biddingItem, inx) => (
                    <BiddingItem
                    />
                ))
            }
        </>
    )
}

export default BiddingList;
