
export default class UserAlreadyExistsException extends Error {
    constructor(message: string) {
        super(message);
    }
}