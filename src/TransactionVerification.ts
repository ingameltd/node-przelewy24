import { CurrencyType } from "./CurrencyType";

/**
 * TransactionVerification
 *
 * @export
 * @interface TransactionVerification
 */
export interface TransactionVerification {
    /**
     * Merchant ID
     *
     * @type {number}
     * @memberof TransactionVerification
     */
    p24_merchant_id: number;

    /**
     * Shop ID (default: Merchant ID)
     *
     * @type {number}
     * @memberof TransactionVerification
     */
    p24_pos_id: number;

    /**
     * A unique ID of the transaction from Merchant’s system
     *
     * @type {string}
     * @memberof TransactionVerification
     */
    p24_session_id: string;

    /**
     * Transaction amount from Merchant’s system
     *
     * @type {number}
     * @memberof TransactionVerification
     */
    p24_amount: number;

    /**
     * PLN, EUR, GBP, CZK
     *
     * @type {CurrencyType}
     * @memberof TransactionVerification
     */
    p24_currency: CurrencyType;

    /**
     * Transaction number received from P24
     *
     * @type {number}
     * @memberof TransactionVerification
     */
    p24_order_id: number;

    /**
     * CRC from fields: p24_session_id, p24_order_id, p24_amount, p24_currency and a „CRC key”.
     *
     * @type {string}
     * @memberof TransactionVerification
     */
    p24_sign: string;
}