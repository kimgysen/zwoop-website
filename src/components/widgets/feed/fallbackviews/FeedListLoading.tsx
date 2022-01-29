import {FC} from "react";
import {Skeleton, Stack} from "@chakra-ui/react";
import Card from "@components/layout/components/card/Card";


const FeedListLoading: FC = () => {
    return (
        <Card>
            <Stack>
                <Skeleton height="20px" />
                <Skeleton height="15px" />
                <Skeleton height="15px" />
            </Stack>
        </Card>
    )
}

export default FeedListLoading;
