import Currency from "@models/post/Currency";
import User from "@models/user/User";

export enum DealStatusEnum {
    OPEN = "OPEN",
    CANCELLED = "CANCELLED",
    PAID = "PAID"
}

export interface DealStatus {
    dealStatusId: number,
    dealStatus: string
}

export const stringFromDealStatusEnum = (dealStatusEnum: DealStatusEnum): string =>
    DealStatusEnum[dealStatusEnum];

export const dealStatusEnumFromString = (dealStatus: string): DealStatusEnum =>
    dealStatus as DealStatusEnum;


export default interface Deal {
    dealId: string,
    dealPrice: string,
    dealStatus: DealStatus,
    asker: User,
    respondent: User,
    currency: Currency,
    createdAt: Date,
    createdBy: string,
    updatedAt: Date,
    updatedBy: string
}
