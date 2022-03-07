import {FC, useEffect, useState} from "react";
import DealButton from "@components/layout/navbar/notification/deal/DealButton";
import AuthState from "@models/auth/AuthState";
import ApiResult from "@api_clients/type/ApiResult";
import {getStompDispatcher} from "../../../../../event_dispatchers/StompDispatcher";
import {
    APP_DEAL_BOX__DEAL_CANCELLED,
    APP_DEAL_BOX__DEAL_INIT
} from "../../../../../event_dispatchers/config/StompEvents";
import {addDeal, removeDealById} from "@components/layout/navbar/notification/deal/dealbox/DealBoxHelper";
import {infoToast} from "@components/widgets/toast/AppToast";
import {getDealsForUserApi} from "@api_clients/feature/deal/DealApiClient";
import {getDealCounterpart} from "../../../../../util/DealUtil";
import DealDto from "@models/dto/rest/receive/deal/DealDto";


interface DealButtonHocProps {
    authState: AuthState
}

const DealButtonHoc: FC<DealButtonHocProps> = ({ authState }) => {

    let defaultDealsRes = { loading: false, success: [], error: null };
    const [dealsRes, setDealsRes] = useState<ApiResult<DealDto[]>>(defaultDealsRes);

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
            stompDispatcher.on(APP_DEAL_BOX__DEAL_INIT, (dealDto: DealDto) => {
                const updatedDeals = addDeal(dealsRes?.success, dealDto);
                setDealsRes({...defaultDealsRes, success: updatedDeals });

                const counterpart = getDealCounterpart(authState, dealDto);
                infoToast(`New deal with ${ counterpart?.nickName }`);
            });

            stompDispatcher.on(APP_DEAL_BOX__DEAL_CANCELLED, (dealDto: DealDto) => {
                const updatedDeals = removeDealById(dealsRes?.success, dealDto?.dealId);
                setDealsRes({...defaultDealsRes, success: updatedDeals })

                const counterpart = getDealCounterpart(authState, dealDto);
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
            dealDtoList={ dealsRes?.success }
        />
    )
}

export default DealButtonHoc;
