import React, {FC} from "react";
import AuthState from "@models/auth/AuthState";
import DealBoxLoading from "@components/layout/navbar/notification/deal/dealbox/fallbackviews/DealBoxLoading";
import {isDealBoxEmpty, isLastDealBoxItem} from "@components/layout/navbar/notification/deal/dealbox/DealBoxHelper";
import DealBoxEmpty from "@components/layout/navbar/notification/deal/dealbox/fallbackviews/DealBoxEmpty";
import {Box, Divider} from "@chakra-ui/react";
import DealBoxItem from "@components/layout/navbar/notification/deal/dealbox/DealBoxItem";
import DealDto from "@models/dto/rest/receive/deal/DealDto";


interface DealBoxProps {
    authState: AuthState
    dealBoxLoading: boolean,
    dealDtoList?: DealDto[] | null,
    closePopup: () => void
}

const DealBox: FC<DealBoxProps> = ({ authState, dealBoxLoading, dealDtoList, closePopup }) => {
    return (
        <>
            {
                dealBoxLoading
                && <DealBoxLoading />
            }
            {
                !dealBoxLoading
                && isDealBoxEmpty(dealDtoList)
                && <DealBoxEmpty />
            }
            {
                !dealBoxLoading
                && !isDealBoxEmpty(dealDtoList)
                && dealDtoList?.map((dealDto, idx) => (
                    <Box key={`dealBoxItem-${ idx }`}
                         textAlign='left'
                    >
                        <DealBoxItem
                            dealDto={ dealDto }
                            closePopup={ closePopup }
                        />
                        {
                            !isLastDealBoxItem(dealDtoList, idx)
                            && <Divider />
                        }
                    </Box>
                ))
            }
        </>
    )
}

export default DealBox;
