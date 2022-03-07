import DealDto from "@models/dto/rest/receive/deal/DealDto";
import AnswerDto from "@models/dto/rest/receive/answer/AnswerDto";
import PostStatusDto from "@models/dto/rest/receive/post/PostStatusDto";


export default interface PostStateDto {
    postStateId: string;
    postStatus: PostStatusDto;
    deal?: DealDto | null;
    answer?: AnswerDto | null;
}