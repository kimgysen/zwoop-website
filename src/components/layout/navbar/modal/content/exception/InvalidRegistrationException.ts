export default class InvalidRegistrationException extends Error {
    constructor(message: string) {
        super(message);
    }
}
