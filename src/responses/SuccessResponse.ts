export interface SuccessResponse<T> {
    /**
     * Response code
     *
     * @type {string}
     * @memberof SuccessResponse
     */
    responseCode: string,

    /**
     * Response data
     *
     * @type {T}
     * @memberof SuccessResponse
     */
    data: T
}