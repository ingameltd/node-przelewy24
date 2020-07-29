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

import { AxiosInstance } from 'axios';
import Axios from 'axios';
import crypto from 'crypto';
import querystring from 'querystring';

import { BaseParameters } from "./BaseParameters";
import { Payment } from "../payments/Payment";
import { P24Error } from '../errors/P24Error';
import { TransactionVerification } from '../payments/TransactionVerification';

export const ApiVersion = '3.2';

const Przelewy24Base = 'https://secure.przelewy24.pl';
const SandboxUrl = 'https://sandbox.przelewy24.pl';
const testConnection = '/testConnection';
const trnRegister = '/trnRegister';
const trnRequest = '/trnRequest';
const trnVerify = '/trnVerify';
const validIps = [
    '91.216.191.181',
    '91.216.191.182',
    '91.216.191.183',
    '91.216.191.184',
    '91.216.191.185',
];

/**
 * Create Przelewy24 instance
 *
 * @export
 * @class Przelewy24
 */
export class Przelewy24 {
    private merchantId: number;
    private posId: number;
    private salt: string;
    private client: AxiosInstance;
    private baseParams: BaseParameters;
    private baseUrl: string;

    /**
     * Creates an instance of Przelewy24.
     * @param {number} merchantId Merchant ID given by Przelewy24
     * @param {number} posId Shop ID (defaults to merchantId)
     * @param {string} salt CRC key from P24 panel
     * @param {boolean} [testMode=false] Whether to use sandbox or not
     * @memberof Przelewy24
     */
    constructor(merchantId: number, posId: number, salt: string, testMode: boolean = false) {
        this.merchantId = merchantId;
        this.posId = posId;
        this.salt = salt;
        if (this.posId === 0)
            this.posId = this.merchantId;

        this.baseUrl = testMode ? SandboxUrl : Przelewy24Base;

        this.client = Axios.create({ baseURL: this.baseUrl });
        this.baseParams = {
            p24_merchant_id: this.merchantId,
            p24_pos_id: this.posId,
            p24_api_version: ApiVersion
        };
    }

    /**
     * Tests the connection to p24
     *
     * @returns {boolean} - returns true on success
     * @memberof Przelewy24
     */
    public async testConnection (): Promise<boolean> {
        const hash = crypto.createHash('md5')
            .update(`${this.posId}|${this.salt}`)
            .digest('hex');
        const data = {
            p24_merchant_id: this.merchantId,
            p24_pos_id: this.posId,
            p24_sign: hash
        };
        const result = await this.client.post(testConnection, querystring.stringify(data));
        const responseData = querystring.decode(result.data);
        if (responseData['error'] !== '0') {
            throw new P24Error(`${responseData['error']}`, `${responseData['errorMessage']}`);
        }
        return true;
    }

    /**
     * Get a payment link
     *
     * @param {Payment} payment - Payment object
     * @returns {string} url to do the payment
     * @memberof Przelewy24
     */
    public async getPaymentLink (payment: Payment): Promise<string> {
        const data = payment.build(this.baseParams, this.salt);
        const result = await this.client.post(trnRegister, querystring.stringify(data));
        const responseData = querystring.decode(result.data);
        if (responseData['error'] === '0') {
            return `${this.baseUrl}${trnRequest}/${responseData['token']}`
        }

        throw new P24Error(`${responseData['error']}`, `${responseData['errorMessage']}`)
    }

    /**
     * Verifies a transaction
     *
     * @param {TransactionVerification} verification
     * @memberof Przelewy24
     */
    public async verifyTransaction (verification: TransactionVerification) {
        const crcData = `${verification.p24_session_id}|${verification.p24_order_id}|${verification.p24_amount}|${verification.p24_currency}|${this.salt}`

        const hash = crypto.createHash('md5')
            .update(crcData)
            .digest('hex');

        if (verification.p24_sign !== hash) {
            throw new P24Error('INVALID_SIGN', `Received sign is invalid`);
        }

        const data = {
            p24_merchant_id: this.merchantId,
            p24_pos_id: this.posId,
            ...verification,
        }
        const result = await this.client.post(trnVerify, querystring.stringify(data));
        const responseData = querystring.decode(result.data);
        if (responseData['error'] === '0') {
            return true
        }

        throw new P24Error(`${responseData['error']}`, `${responseData['errorMessage']}`)
    }

    /**
     * Validates IP with P24 backends
     *
     * @static
     * @param {string} ip - IP Address
     * @returns {boolean} - true on validated ip 
     * @memberof Przelewy24
     */
    public static isIpValid (ip: string): boolean {
        return validIps.includes(ip)
    }
}
