import { Currency } from '../enums/Currency';
/**
 * Transaction verification
 *
 * @export
 * @interface TransactionVerification
 */
export interface Verification {
    /**
     * Session ID from merchant's system
     *
     * @type {string}
     * @memberof TransactionVerification
     */
    sessionId: string;

    /**
     * Transaction amount which format is presented as amount in lowest currency
     * unit, e.g. 1.23 PLN = 123
     *
     * @type {number}
     * @memberof TransactionVerification
     */
    amount: number;

    /**
     * Currency
     *
     * @type {Currency}
     * @memberof TransactionVerification
     */
    currency: Currency;

    /**
     * Id of an order
     *
     * @type {number}
     * @memberof TransactionVerification
     */
    orderId: number;
}