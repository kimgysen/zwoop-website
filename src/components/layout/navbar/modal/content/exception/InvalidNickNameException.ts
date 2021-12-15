
export default class InvalidNickNameException extends Error {
    constructor(message: string) {
        super(message);
    }
}