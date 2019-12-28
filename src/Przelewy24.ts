import { AxiosInstance } from 'axios';
import Axios from 'axios';
import crypto from 'crypto';
import querystring from 'querystring';

import { ShoppingDetail } from "./ShoppingDetail";
import { PaymentOptions } from "./PaymentOptions";
import { BaseParameters } from "./BaseParameters";
import { CountryCode } from "./CountryCode";
import { CurrencyType } from "./CurrencyType";
import { Payment } from "./Payment";
import { P24Error } from './P24Error';
import { TransactionVerification } from '../dist/TransactionVerification';

export const ApiVersion = '3.2';

const Przelewy24Base = 'https://secure.przelewy24.pl';
const SandboxUrl = 'https://sandbox.przelewy24.pl';
const testConnection = '/testConnection';
const trnRegister = '/trnRegister';
const trnRequest = '/trnRequest';
const trnVerify = '/trnVerify';

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
     * @param {string} salt md5 of p24_pos_id|CRC
     * @param {boolean} [testMode=false] Whether to use sandbox or not
     * @memberof Przelewy24
     */
    constructor(merchantId: number, posId: number, salt: string, testMode: boolean = false) {
        this.merchantId = merchantId;
        this.posId = posId;
        this.salt = salt;
        if (this.posId === 0)
            this.posId = this.merchantId;

        if (!testMode)
            this.baseUrl = Przelewy24Base;
        else
            this.baseUrl = SandboxUrl;

        this.client = Axios.create({ baseURL: this.baseUrl });
        this.baseParams = {
            p24_merchant_id: this.merchantId,
            p24_pos_id: this.posId,
            p24_api_version: ApiVersion
        };
    }
    /**
     * TestConnection to Przelewy24
     * return true on success
     */
    public async testConnection () {
        const hash = crypto.createHash('md5')
            .update(`${this.posId}|${this.salt}`)
            .digest('hex');
        const data = {
            p24_merchant_id: this.merchantId,
            p24_pos_id: this.posId,
            p24_sign: hash
        };
        const result = await this.client.post(testConnection, data);
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
     * @returns
     * @memberof Przelewy24
     */
    public async getPaymentLink (payment: Payment) {
        const data = payment.build(this.baseParams);
        const result = await this.client.post(trnRegister, data);
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
        const result = await this.client.post(trnVerify, verification);
        const responseData = querystring.decode(result.data);
        if (responseData['error'] === '0') {
            return true
        }

        throw new P24Error(`${responseData['error']}`, `${responseData['errorMessage']}`)
    }
}

const p24 = new Przelewy24(1234, 12, 'dsfsdfs', true)

async function test () {
    try {
        const r = await p24.testConnection()
        console.log(r)
    } catch (error) {

        console.log(error)
    }

    const paymentParam: PaymentOptions = {
        p24_amount: 100,
        p24_country: CountryCode.Poland,
        p24_currency: CurrencyType.PLN,
        p24_description: 'test',
        p24_email: 'abc@123.com',
        p24_session_id: '122223333',
        p24_url_return: 'http://lcff.com'
    }

    const sd1: ShoppingDetail[] = [
        { name: 'wewe', price: 133, quantity: 4 },
        { name: '11wewe', price: 13, quantity: 1 }
    ]
    await p24.getPaymentLink(new Payment(paymentParam, sd1))
}

test()
