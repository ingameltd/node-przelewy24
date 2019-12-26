import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Axios from 'axios';
import * as crypto from 'crypto';
import * as querystring from 'querystring';

const BaseUrl = 'https://secure.przelewy24.pl/';
const SandboxUrl = 'https://sandbox.przelewy24.pl/';

const API_VERSION = '3.2'

interface BaseRequestParams {
  /**
   * Merchant ID
   *
   * @type {number}
   * @memberof BaseRequestParams
   */
  p24_merchant_id: number;

  /**
   * Shop ID (default Merchant ID)
   *
   * @type {number}
   * @memberof BaseRequestParams
   */
  p24_pos_id: number;

  /**
   * API VERSION default to 3.2
   *
   * @type {string}
   * @memberof BaseRequestParams
   */
  p24_api_version: string;
}

enum CurrencyType {
  PLN = 'PLN',
  EUR = 'EUR',
  GBP = 'GPB',
  CZK = 'CZK'
}

interface PaymentOptions {
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
   * @type {CurrencyType}
   * @memberof PaymentOptions
   */
  p24_currency: CurrencyType;

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
}

class Przelewy24 {
  merchantId: number;
  posId: number;
  salt: string;
  client: AxiosInstance;
  base: BaseRequestParams;

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
      this.client = Axios.create({ baseURL: BaseUrl })
    } else {
      this.client = Axios.create({ baseURL: SandboxUrl })
    }

    this.base = {
      p24_merchant_id: this.merchantId,
      p24_pos_id: this.posId,
      p24_api_version: API_VERSION
    }
  }

  /**
   * TestConnection to Przelewy24
   * return true on success
   */
  public async testConnection () {
    const hash = crypto.createHash('md5')
      .update(`${this.posId}|${this.salt}`)
      .digest('hex')
    const data = {
      p24_merchant_id: this.merchantId,
      p24_pos_id: this.posId,
      p24_sign: hash
    }

    const result = await this.client.post('/testConnection', data)
    const responseData = querystring.decode(result.data)

    if (responseData['error'] !== '0') {
      throw new Error(`Unable to connect ${responseData['errorMessage']}`)
    }

    return true
  }
}
