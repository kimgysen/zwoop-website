import DealOpenedDto from "../../../../../../service/stomp/dto/receive/notification/feature/deal/DealOpenedDto";


export const isDealBoxEmpty = (deals?: DealOpenedDto[]) =>
    !deals || deals.length === 0;

export const addDeal = (deals: DealOpenedDto[] | null, deal: DealOpenedDto) =>
     deals
        ? [deal, ...deals]
        : [deal];

export const removeDealByPostId = (deals: DealOpenedDto[] | null, postId: string) =>
    deals
        ? deals.filter(deal => deal.postId !== postId)
        : [];
