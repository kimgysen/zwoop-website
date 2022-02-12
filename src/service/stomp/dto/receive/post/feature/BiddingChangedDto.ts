import BiddingUpdateDto from "./BiddingUpdateDto";

export default interface BiddingChangedDto extends BiddingUpdateDto {
    askPrice: string
}
