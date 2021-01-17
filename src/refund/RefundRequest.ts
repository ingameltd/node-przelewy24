import { Refund } from "./Refund";

/**
 * Refund request
 *
 * @export
 * @interface RefundRequest
 */
export interface RefundRequest {
    /**
     * Individual request ID
     *
     * @type {string}
     * @memberof RefundRequest
     */
    requestId: string,

    /**
     * Refunds
     *
     * @type {Refund[]}
     * @memberof RefundRequest
     */
    refunds: Refund[],

    /**
     * Individual ID for a correct refund request in the merchant’s system
     *
     * @type {string}
     * @memberof RefundRequest
     */
    refundsUuid: string,

    /**
     * Notification address for the refund batch transferred
     *
     * @type {string}
     * @memberof RefundRequest
     */
    urlStatus?: string
}