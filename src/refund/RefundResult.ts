/**
 * Refund result
 *
 * @export
 * @interface RefundResult
 */
export interface RefundResult {
    /**
     * Transaction order ID from Przelewy24
     *
     * @type {string}
     * @memberof RefundResult
     */
    orderId: string;

    /**
     * Transaction session ID from the Partner’s system
     *
     * @type {string}
     * @memberof RefundResult
     */
    sessionId: string;

    /**
     * Amount of refund
     *
     * @type {string}
     * @memberof RefundResult
     */
    amount: string;

    /**
     * Transaction description
     *
     * @type {string}
     * @memberof RefundResult
     */
    description: string;

    /**
     * Was refund attempt successful?
     *
     * @type {boolean}
     * @memberof RefundResult
     */
    status: boolean;

    /**
     * Text description of successful refund
     *
     * @type {string}
     * @memberof RefundResult
     */
    message: string;
}