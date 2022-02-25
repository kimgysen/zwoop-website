import DealInitDto from "@models/dto/stomp/receive/dealbox/DealInitDto";

export const isDealBoxEmpty = (deals?: DealInitDto[] | null) =>
    !deals || deals.length === 0;

export const addDeal = (deals: DealInitDto[] | null, dealInitDto: DealInitDto) =>
     deals
        ? [dealInitDto, ...deals]
        : [dealInitDto];

export const removeDealById = (deals: DealInitDto[] | null, dealId: string) =>
    deals
        ? deals.filter(deal => deal.dealId !== dealId)
        : [];

export const isLastDealBoxItem = (dealBoxItems: DealInitDto[], idx: number) =>
    dealBoxItems.length - 1 === idx;
