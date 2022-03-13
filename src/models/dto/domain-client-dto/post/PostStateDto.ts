import DealDto from "@models/dto/domain-client-dto/deal/DealDto";
import AnswerDto from "@models/dto/domain-client-dto/answer/AnswerDto";
import PostStatusDto from "@models/dto/domain-client-dto/post/PostStatusDto";


export default interface PostStateDto {
    postStateId: string;
    postStatus: PostStatusDto;
    deal?: DealDto | null;
    answer?: AnswerDto | null;
}