import {FC, useEffect, useState} from "react";
import DealButton from "@components/layout/navbar/notification/deal/DealButton";
import AuthState from "@models/user/AuthState";
import DealOpenedDto from "../../../../../service/stomp/dto/receive/notification/feature/deal/DealOpenedDto";
import ApiResult from "@api_clients/type/ApiResult";
import {getOpenDeals} from "@api_clients/feature/DealService";
import {getStompDispatcher} from "../../../../../event_dispatchers/StompDispatcher";
import {
    DEAL_UPDATE__DEAL_CANCELLED,
    DEAL_UPDATE__DEAL_OPENED
} from "../../../../../event_dispatchers/config/StompEvents";
import {addDeal, removeDealByPostId} from "@components/layout/navbar/notification/deal/dealbox/DealBoxHelper";
import {DealCancelledDto} from "../../../../../service/stomp/dto/receive/notification/feature/deal/DealCancelledDto";


interface DealButtonHocProps {
    authState: AuthState
}

const DealButtonHoc: FC<DealButtonHocProps> = ({ authState }) => {

    let defaultDealsRes = { loading: false, success: null, error: null };
    const [dealsRes, setDealsRes] = useState<ApiResult<DealOpenedDto[]>>(defaultDealsRes);

    const stompDispatcher = getStompDispatcher();

    useEffect(() => {
        (async() => {
            setDealsRes({...defaultDealsRes, loading: true});
            const res = await getOpenDeals();
            setDealsRes(res);

        })();
    }, []);

    useEffect(() => {
        if (authState.principalId) {
            stompDispatcher.on(DEAL_UPDATE__DEAL_OPENED, (deal: DealOpenedDto) => {
                console.log('DEAL_UPDATE__DEAL_OPENED', deal);
                const updatedDeals = addDeal(dealsRes?.success, deal);
                console.log(updatedDeals);
                setDealsRes({...defaultDealsRes, success: updatedDeals })
            });

            stompDispatcher.on(DEAL_UPDATE__DEAL_CANCELLED, (deal: DealCancelledDto) => {
                console.log('DEAL_UPDATE__DEAL_CANCELLED', deal);
                const updatedDeals = removeDealByPostId(dealsRes?.success, deal?.postId);
                setDealsRes({...defaultDealsRes, success: updatedDeals })
            });
        }

        return function cleanUp() {
            stompDispatcher.remove(DEAL_UPDATE__DEAL_OPENED);
            stompDispatcher.remove(DEAL_UPDATE__DEAL_CANCELLED);
        }

    }, [authState?.principalId, dealsRes?.success]);

    return (
        <DealButton
            authState={ authState }
            dealBoxLoading={ dealsRes?.loading }
            dealBoxItems={ dealsRes?.success }
        />
    )
}

export default DealButtonHoc;
