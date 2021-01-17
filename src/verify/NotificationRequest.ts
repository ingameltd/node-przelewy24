/**
 * Notification request
 *
 * @export
 * @interface NotificationRequest
 */
export interface NotificationRequest {
    /**
     * Merchant identification number
     *
     * @type {number}
     * @memberof NotificationRequest
     */
    merchantId: number;

    /**
     * Shop identification number (defaults to merchant ID)
     *
     * @type {number}
     * @memberof NotificationRequest
     */
    posId: number;

    /**
     * Unique identifier from merchant's system
     *
     * @type {string}
     * @memberof NotificationRequest
     */
    sessionId: string;

    /**
     * Transaction amount expressed in lowest currency unit, e.g. 1.23 PLN = 123
     *
     * @type {number}
     * @memberof NotificationRequest
     */
    amount: number;

    /**
     * Transaction amount expressed in lowest currency unit, e.g. 1.23 PLN = 123
     *
     * @type {number}
     * @memberof NotificationRequest
     */
    originAmount: number;

    /**
     * Currency compatible with ISO, e.g. PLN
     *
     * @type {string}
     * @memberof NotificationRequest
     */
    currency: string;

    /**
     * Transaction number assigned by P24
     *
     * @type {number}
     * @memberof NotificationRequest
     */
    orderId: number;

    /**
     * Payment method used by customer
     *
     * @type {number}
     * @memberof NotificationRequest
     */
    methodId: number;

    /**
     * Payment title
     *
     * @type {string}
     * @memberof NotificationRequest
     */
    statement: string;

    /**
     * Checksum of parameters:
     * ( {"merchantId": int, "posId": int, "sessionId": "string", "amount": int, "originAmount": int, "currency": "string", "orderId": int, "methodId": int, "statement": string, "crc": "string"} )
     * 
     * calculated with the use of sha384
     *
     * @type {string}
     * @memberof NotificationRequest
     */
    sign: string;
}
