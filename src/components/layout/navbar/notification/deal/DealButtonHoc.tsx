import {FC, useEffect, useState} from "react";
import DealButton from "@components/layout/navbar/notification/deal/DealButton";
import AuthState from "@models/auth/AuthState";
import ApiResult from "@api_clients/type/ApiResult";
import {getStompDispatcher} from "../../../../../event_dispatchers/StompDispatcher";
import {
    NOTIFICATION__DEAL_CANCELLED,
    NOTIFICATION__DEAL_INIT
} from "../../../../../event_dispatchers/config/StompEvents";
import {addDeal, removeDealById} from "@components/layout/navbar/notification/deal/dealbox/DealBoxHelper";
import {infoToast} from "@components/widgets/toast/AppToast";
import {getDealsForUserApi} from "@api_clients/feature/deal/DealApiClient";
import {getDealCounterpart} from "../../../../../util/DealUtil";
import DealDto from "@models/dto/domain-client-dto/deal/DealDto";


interface DealButtonHocProps {
    authState: AuthState
}

const stompDispatcher = getStompDispatcher();

const DealButtonHoc: FC<DealButtonHocProps> = ({ authState }) => {

    let defaultDealsRes = { loading: false, success: [], error: null };
    const [dealsRes, setDealsRes] = useState<ApiResult<DealDto[]>>(defaultDealsRes);

    useEffect(() => {
        (async() => {
            setDealsRes({...defaultDealsRes, loading: true});
            const res = await getDealsForUserApi();
            setDealsRes(res);
        })();
    }, []);


    useEffect(() => {
        if (authState?.principalId) {
            stompDispatcher.on(NOTIFICATION__DEAL_INIT, (dealDto: DealDto) => {
                const updatedDeals = addDeal(dealsRes?.success, dealDto);
                setDealsRes({...defaultDealsRes, success: updatedDeals });

                const counterpart = getDealCounterpart(authState, dealDto);
                infoToast(`New deal with ${ counterpart?.nickName }`);
            });

            stompDispatcher.on(NOTIFICATION__DEAL_CANCELLED, (dealDto: DealDto) => {
                const updatedDeals = removeDealById(dealsRes?.success, dealDto?.dealId);
                setDealsRes({...defaultDealsRes, success: updatedDeals })

                const counterpart = getDealCounterpart(authState, dealDto);
                infoToast(`Deal with ${ counterpart?.nickName } cancelled`);
            });
        }

        return function cleanUp() {
            stompDispatcher.remove(NOTIFICATION__DEAL_INIT);
            stompDispatcher.remove(NOTIFICATION__DEAL_CANCELLED);
        }

    }, [authState?.principalId]);

    return (
        <DealButton
            authState={ authState }
            dealBoxLoading={ dealsRes?.loading }
            dealDtoList={ dealsRes?.success }
        />
    )
}

export default DealButtonHoc;
