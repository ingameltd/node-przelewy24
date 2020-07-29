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

import { Currency } from "../enums/Currency";

/**
 * TransactionVerification
 *
 * @export
 * @interface TransactionVerification
 */
export interface TransactionVerification {
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
     * @type {string}
     * @memberof TransactionVerification
     */
    p24_currency: string;

    /**
     * Transaction number received from P24
     *
     * @type {number}
     * @memberof TransactionVerification
     */
    p24_order_id: number;

    /**
     * Sign for transaction data
     *
     * @type {string}
     * @memberof TransactionVerification
     */
    p24_sign: string;
}
