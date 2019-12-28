/**
 * MIT License
 *
 * Copyright (c) 2019 Kasun Vithanage
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

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