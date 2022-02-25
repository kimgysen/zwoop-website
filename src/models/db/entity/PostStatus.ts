

export enum PostStatusEnum {
    POST_INIT= 'POST_INIT',
    DEAL_INIT = 'DEAL_INIT',
    ANSWERED = 'ANSWERED',
    ANSWER_ACCEPTED = 'ANSWER_ACCEPTED',
    PAID = 'PAID'
}

export default interface PostStatus {
    postStatusId: string,
    status: string,
    description: string
}

export const stringFromPostStatusEnum = (postStatusEnum: PostStatusEnum): string =>
    PostStatusEnum[postStatusEnum];

