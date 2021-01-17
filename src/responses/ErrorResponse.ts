export interface ErrorResponse<T> {
    /**
     * Error
     *
     * @type {T}
     * @memberof ErrorResponse
     */
    error: T,

    /**
     * Error code
     *
     * @type {number}
     * @memberof ErrorResponse
     */
    code: number
}