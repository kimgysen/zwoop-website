import ChatPartner from "@models/chat/ChatPartner";

export default interface InboxDetail {
    isActive: boolean,
    partner?: ChatPartner
}
