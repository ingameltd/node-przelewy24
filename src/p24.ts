import { AxiosInstance } from 'axios';
import Axios from 'axios';
import crypto from 'crypto';
import * as querystring from 'querystring';

import { BaseParameters, PaymentOptions, CountryCode, CurrencyType } from './types';

const BaseUrl = 'https://secure.przelewy24.pl/';
const SandboxUrl = 'https://sandbox.przelewy24.pl/';

export const ApiVersion = '3.2';

export class Przelewy24 {
    private merchantId: number;
    private posId: number;
    private salt: string;
    private client: AxiosInstance;
    private base: BaseParameters;

    constructor(
        merchantId: number, posId: number, salt: string,
        testMode: boolean = false) {
        this.merchantId = merchantId;
        this.posId = posId;
        this.salt = salt;

        if (this.merchantId === 0) {
            this.merchantId = this.posId;
        }

        if (!testMode) {
            this.client = Axios.create({ baseURL: BaseUrl });
        } else {
            this.client = Axios.create({ baseURL: SandboxUrl });
        }

        this.base = {
            p24_merchant_id: this.merchantId,
            p24_pos_id: this.posId,
            p24_api_version: ApiVersion
        }
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
        }

        const result = await this.client.post('/testConnection', data);
        const responseData = querystring.decode(result.data);

        if (responseData['error'] !== '0') {
            throw new Error(`Unable to connect ${responseData['errorMessage']}`);
        }

        return true;
    }

    /**
     * getPaymentLink
     */
    public async getPaymentLink (options: PaymentOptions) {

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

    await p24.getPaymentLink({
        p24_amount: 100,
        p24_country: CountryCode.Poland,
        p24_currency: CurrencyType.PLN,
        p24_description: 'test',
        p24_email: 'abc@123.com',
        p24_session_id: '122223333',
        p24_url_return: 'http://lcff.com'
    })
}

test()
