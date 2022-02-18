
export default interface DealOpenedDto {
    postId: string,
    postTitle: string,
    askerId: string;
    askerNickName: string;
    respondentId: string;
    respondentNickName: string;
    dealPrice: string;
    currencyCode: string;
}
