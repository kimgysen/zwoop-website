import React, {FC} from "react";
import AuthState from "@models/auth/AuthState";
import DealInitDto from "@models/dto/stomp/receive/common/deal/DealInitDto";
import DealBoxLoading from "@components/layout/navbar/notification/deal/dealbox/fallbackviews/DealBoxLoading";
import {isDealBoxEmpty, isLastDealBoxItem} from "@components/layout/navbar/notification/deal/dealbox/DealBoxHelper";
import DealBoxEmpty from "@components/layout/navbar/notification/deal/dealbox/fallbackviews/DealBoxEmpty";
import {Box, Divider} from "@chakra-ui/react";
import DealBoxItem from "@components/layout/navbar/notification/deal/dealbox/DealBoxItem";


interface DealBoxProps {
    authState: AuthState
    dealBoxLoading: boolean,
    dealBoxItems?: DealInitDto[] | null,
    closePopup: () => void
}

const DealBox: FC<DealBoxProps> = ({ authState, dealBoxLoading, dealBoxItems, closePopup }) => {
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
                            closePopup={ closePopup }
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
