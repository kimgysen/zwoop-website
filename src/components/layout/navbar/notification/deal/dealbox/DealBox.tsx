import React, {FC} from "react";
import AuthState from "@models/user/AuthState";
import DealOpenedDto from "../../../../../../service/stomp/dto/receive/notification/feature/deal/DealOpenedDto";
import DealBoxLoading from "@components/layout/navbar/notification/deal/dealbox/fallbackviews/DealBoxLoading";
import {isDealBoxEmpty, isLastDealBoxItem} from "@components/layout/navbar/notification/deal/dealbox/DealBoxHelper";
import DealBoxEmpty from "@components/layout/navbar/notification/deal/dealbox/fallbackviews/DealBoxEmpty";
import {Box, Divider} from "@chakra-ui/react";
import DealBoxItem from "@components/layout/navbar/notification/deal/dealbox/DealBoxItem";


interface DealBoxProps {
    authState: AuthState
    dealBoxLoading: boolean,
    dealBoxItems?: DealOpenedDto[] | null
}

const DealBox: FC<DealBoxProps> = ({ authState, dealBoxLoading, dealBoxItems }) => {
    return (
        <>
            {
                dealBoxLoading
                && <DealBoxLoading />
            }
            {
                !dealBoxLoading
                && isDealBoxEmpty(dealBoxItems)
                && <DealBoxEmpty />
            }
            {
                !dealBoxLoading
                && !isDealBoxEmpty(dealBoxItems)
                && dealBoxItems?.map((dealBoxItem, idx) => (
                    <Box key={`dealBoxItem-${ idx }`}
                         textAlign='left'
                    >
                        <DealBoxItem
                            deal={ dealBoxItem }
                        />
                        {
                            !isLastDealBoxItem(dealBoxItems, idx)
                            && <Divider />
                        }
                    </Box>
                ))
            }
        </>
    )
}

export default DealBox;
