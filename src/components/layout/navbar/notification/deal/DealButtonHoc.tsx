import {FC, useEffect, useState} from "react";
import DealButton from "@components/layout/navbar/notification/deal/DealButton";
import AuthState from "@models/auth/AuthState";
import DealInitDto from "@models/dto/stomp/receive/dealbox/DealInitDto";
import ApiResult from "@api_clients/type/ApiResult";
import {getStompDispatcher} from "../../../../../event_dispatchers/StompDispatcher";
import {
    APP_DEAL_BOX__DEAL_CANCELLED,
    APP_DEAL_BOX__DEAL_INIT
} from "../../../../../event_dispatchers/config/StompEvents";
import {addDeal, removeDealById} from "@components/layout/navbar/notification/deal/dealbox/DealBoxHelper";
import {infoToast} from "@components/widgets/toast/AppToast";
import {getDealsForUserApi} from "@api_clients/feature/deal/DealApiClient";
import DealCancelledDto from "@models/dto/stomp/receive/dealbox/DealCancelledDto";
import {getDealCounterpart} from "../../../../../util/DealUtil";


interface DealButtonHocProps {
    authState: AuthState
}

const DealButtonHoc: FC<DealButtonHocProps> = ({ authState }) => {

    let defaultDealsRes = { loading: false, success: null, error: null };
    const [dealsRes, setDealsRes] = useState<ApiResult<DealInitDto[]>>(defaultDealsRes);

    const stompDispatcher = getStompDispatcher();

    useEffect(() => {
        (async() => {
            setDealsRes({...defaultDealsRes, loading: true});
            const res = await getDealsForUserApi();
            setDealsRes(res);
        })();
    }, []);


    useEffect(() => {
        if (authState.principalId) {
            stompDispatcher.on(APP_DEAL_BOX__DEAL_INIT, (deal: DealInitDto) => {
                const updatedDeals = addDeal(dealsRes?.success, deal);
                setDealsRes({...defaultDealsRes, success: updatedDeals });

                const counterpart = getDealCounterpart(authState, deal);
                infoToast(`New deal with ${ counterpart?.nickName }`);
            });

            stompDispatcher.on(APP_DEAL_BOX__DEAL_CANCELLED, (deal: DealCancelledDto) => {
                const updatedDeals = removeDealById(dealsRes?.success, deal?.dealId);
                setDealsRes({...defaultDealsRes, success: updatedDeals })

                const counterpart = getDealCounterpart(authState, deal);
                infoToast(`Deal with ${ counterpart?.nickName } cancelled`);
            });
        }

        return function cleanUp() {
            stompDispatcher.remove(APP_DEAL_BOX__DEAL_INIT);
            stompDispatcher.remove(APP_DEAL_BOX__DEAL_CANCELLED);
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
