export class P24Error extends Error {
    constructor(code: string, message: string) {
        super(`errorCode = ${code}, errorMessage = ${message}`); // 'Error' breaks prototype chain here
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
