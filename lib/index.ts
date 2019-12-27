import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Axios from 'axios';
import * as crypto from 'crypto';
import * as querystring from 'querystring';

const BaseUrl = 'https://secure.przelewy24.pl/';
const SandboxUrl = 'https://sandbox.przelewy24.pl/';

const API_VERSION = '3.2';

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
      this.client = Axios.create({ baseURL: BaseUrl });
    } else {
      this.client = Axios.create({ baseURL: SandboxUrl });
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
}
