/**
 * Refund 
 *
 * @export
 * @interface Refund
 */
export interface Refund {
    /**
     * Transaction order ID from Przelewy24
     *
     * @type {number}
     * @memberof Refund
     */
    orderId: number,

    /**
     * Transaction session ID from the Partner’s system
     *
     * @type {string}
     * @memberof Refund
     */
    sessionId: string,

    /**
     * Amount of refund
     *
     * @type {number}
     * @memberof Refund
     */
    amount: number,

    /**
     * Refund description visible in transfer details
     *
     * @type {string}
     * @memberof Refund
     */
    description: string
}