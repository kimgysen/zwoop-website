import BiddingUpdateDto from "@models/dto/stomp/receive/post/feature/bidding/BiddingUpdateDto";

export default interface BiddingChangedDto extends BiddingUpdateDto {
    askPrice: string;
}
