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
import { Country } from "../enums/Country";
import { Language } from "../enums/Language";
import { CharacterEncoding } from "../enums/CharacterEncoding";
/**
 * Payment Options
 *
 * @interface PaymentOptions
 */
export interface PaymentOptions {
    /**
     * A unique ID from Merchant’s system
     *
     * @type {string}
     * @memberof PaymentOptions
     */
    p24_session_id: string;

    /**
     * Amount, presented in 1/100 of the currency.
     * __Example: 12,30 PLN = 1230__
     *
     * @type {number}
     * @memberof PaymentOptions
     */
    p24_amount: number;

    /**
     * PLN, EUR, GBP, CZK
     *
     * @type {Currency}
     * @memberof PaymentOptions
     */
    p24_currency: Currency;

    /**
     * Transaction description
     *
     * @type {string}
     * @memberof PaymentOptions
     */
    p24_description: string;

    /**
     * Client’s email address
     *
     * @type {string}
     * @memberof PaymentOptions
     */
    p24_email: string;

    /**
     * Client’s full name
     *
     * @type {string}
     * @memberof PaymentOptions
     */
    p24_client?: string;


    /**
     * Client’s address
     *
     * @type {string}
     * @memberof PaymentOptions
     */
    p24_address?: string;

    /**
     * Client’s zip-code
     *
     * @type {string}
     * @memberof PaymentOptions
     */
    p24_zip?: string;

    /**
     * Client’s city
     *
     * @type {string}
     * @memberof PaymentOptions
     */
    p24_city?: string;

    /**
     * Country code
     *
     * @type {Country}
     * @memberof PaymentOptions
     */
    p24_country: Country;

    /**
     *  Client’s phone number: 481321132123
     *
     * @type {string}
     * @memberof PaymentOptions
     */
    p24_phone?: string;

    /**
     * Langs pl, en, de, es, it
     *
     * @type {Language}
     * @memberof PaymentOptions
     */
    p24_language?: Language;

    /**
     * An ID of preferred (chosen) payment method.
     * Full list of payment methods
     * is available in P24 Admin panel, or via API
     *
     * @type {number}
     * @memberof PaymentOptions
     */
    p24_method?: number;

    /**
     * Return address, where Client will be redirected to,
     * after the transaction is completed.
     *
     * @type {string}
     * @memberof PaymentOptions
     */
    p24_url_return: string;

    /**
     * Address where the status of a transaction is sent.
     * It can be omitted if stored in P24 system.
     *
     * @type {string}
     * @memberof PaymentOptions
     */
    p24_url_status?: string;

    /**
     * Time limit for the transaction to be processed,
     * 0 - unlimited, max. 99(in minutes)
     *
     * @type {number}
     * @memberof PaymentOptions
     */
    p24_time_limit?: number;

    /**
     * Whether the Client has to wait for the result in P24 system ( 0 / 1 )
     *
     * @type {number}
     * @memberof PaymentOptions
     */
    p24_wait_for_result?: number;

    /**
     * 1 - CC,
     * 2 – bank transfers,
     * 4 – manual transfer,
     * 8 – N/A
     * 16 – all methods 24/7,
     * 32 – use prepayment
     * Value contains the sum of above options. By default all options are enabled.
     *
     * @type {number}
     * @memberof PaymentOptions
     */
    p24_channel?: number;

    /**
     * Shipping/packaging cost
     *
     * @type {number}
     * @memberof PaymentOptions
     */
    p24_shipping?: number;

    /**
     * Additional transfer’s description in Client’s bank.
     *
     * @type {string}
     * @memberof PaymentOptions
     */
    p24_transfer_label?: string;

    /**
     * Character encoding:
     * ISO-8859-2, UTF-8, Windows-1250
     *
     * @type {CharacterEncoding}
     * @memberof PaymentOptions
     */
    p24_encoding?: CharacterEncoding;
}
