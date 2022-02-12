import BiddingUpdateDto from "./BiddingUpdateDto";

export default interface BiddingAddedDto extends BiddingUpdateDto {
    askPrice: string,
    currencyCode: string
}
