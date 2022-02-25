import BiddingUpdateDto from "@models/dto/stomp/receive/post/feature/bidding/BiddingUpdateDto";

export default interface BiddingAddedDto extends BiddingUpdateDto {
    askPrice: string;
    currencyCode: string;
}
