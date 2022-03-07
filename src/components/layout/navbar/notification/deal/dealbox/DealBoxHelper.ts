import DealDto from "@models/dto/rest/receive/deal/DealDto";

export const isDealBoxEmpty = (deals?: DealDto[] | null) =>
    !deals || deals.length === 0;

export const addDeal = (dealDtoList: DealDto[] | null, dealDto: DealDto) =>
    dealDtoList
        ? [dealDto, ...dealDtoList]
        : [dealDto];

export const removeDealById = (dealDtoList: DealDto[] | null, dealId: string) =>
    dealDtoList
        ? dealDtoList.filter(dealDto => dealDto.dealId !== dealId)
        : [];

export const isLastDealBoxItem = (dealDtoList: DealDto[], idx: number) =>
    dealDtoList.length - 1 === idx;
