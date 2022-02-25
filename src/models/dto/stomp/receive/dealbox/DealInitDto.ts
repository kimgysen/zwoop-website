import DealBoxDto from "@models/dto/stomp/receive/dealbox/DealBoxDto";

export default interface DealInitDto extends DealBoxDto {
    postId: string;
    postTitle: string;
    dealPrice: string;
    currencyCode: string;
}
