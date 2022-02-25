import Bidding from "@models/db/entity/Bidding";


export default interface Deal {
    dealId: string,
    bidding: Bidding
}