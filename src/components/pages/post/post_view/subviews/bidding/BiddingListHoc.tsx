import {FC} from "react";
import useBiddings from "../../../../../../service/swr/bidding/UseBiddings";
import BiddingListLoading from "@components/pages/post/post_view/subviews/bidding/fallbackviews/BiddingListLoading";
import BiddingListEmpty from "@components/pages/post/post_view/subviews/bidding/fallbackviews/BiddingListEmpty";
import BiddingListError from "@components/pages/post/post_view/subviews/bidding/fallbackviews/BiddingListError";
import BiddingList from "@components/pages/post/post_view/subviews/bidding/BiddingList";
import Card from "@components/layout/components/card/Card";

interface BiddingListHocProps {
    postId: string
}


const BiddingListHoc: FC<BiddingListHocProps> = ({ postId }) => {

    const { loading, data: biddingList, error } = useBiddings(postId);

    return (
        <Card>
            {
                loading
                && <BiddingListLoading />
            }
            {
                !loading
                && !error
                && biddingList
                && biddingList.length === 0
                && <BiddingListEmpty />
            }
            {
                error
                && <BiddingListError errorMsg={ error } />
            }
            {
                biddingList
                && biddingList.length > 0
                && <BiddingList biddingList={ biddingList } />
            }
        </Card>
    )
}

export default BiddingListHoc;
