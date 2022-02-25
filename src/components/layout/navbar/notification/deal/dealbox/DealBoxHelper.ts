import Deal from "@models/db/entity/Deal";

export const isDealBoxEmpty = (deals?: Deal[] | null) =>
    !deals || deals.length === 0;

export const addDeal = (deals: Deal[] | null, deal: Deal) =>
     deals
        ? [deal, ...deals]
        : [deal];

export const removeDealByPostId = (deals: Deal[] | null, postId: string) =>
    deals
        ? deals.filter(deal => deal.postId !== postId)
        : [];

export const isLastDealBoxItem = (dealBoxItems: Deal[], idx: number) =>
    dealBoxItems.length - 1 === idx;
