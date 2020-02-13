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

import { ShoppingDetail } from "./ShoppingDetail";
import { PaymentOptions } from "./PaymentOptions";
import { BaseParameters } from "./BaseParameters";
import crypto from 'crypto';
import { P24ValidationError } from './P24ValidationError';

function validateLength (key: string | undefined, maxLength: number, keyName: string) {
    if (key && key.length > maxLength) {
        throw new P24ValidationError(`${keyName} should be less than ${maxLength} characters`);
    }
    return true;
}

export class Payment {
    private paymentOptions: PaymentOptions;
    private shoppingDetails: Array<ShoppingDetail>;

    constructor(paymentOptions: PaymentOptions, shoppingDetails: Array<ShoppingDetail> = []) {
        this.paymentOptions = paymentOptions;
        this.shoppingDetails = shoppingDetails;
    }

    private validatePayment () {
        validateLength(this.paymentOptions.p24_session_id, 100, 'p24_session_id');
        validateLength(this.paymentOptions.p24_description, 1024, 'p24_description');
        validateLength(this.paymentOptions.p24_email, 50, 'p24_email');
        validateLength(this.paymentOptions.p24_client, 50, 'p24_client');
        validateLength(this.paymentOptions.p24_address, 80, 'p24_address');
        validateLength(this.paymentOptions.p24_zip, 10, 'p24_zip');
        validateLength(this.paymentOptions.p24_city, 50, 'p24_city');
        validateLength(this.paymentOptions.p24_phone, 12, 'p24_phone');
        validateLength(this.paymentOptions.p24_url_return, 250, 'p24_url_return');
        validateLength(this.paymentOptions.p24_url_status, 250, 'p24_url_status');
        validateLength(this.paymentOptions.p24_transfer_label, 20, 'p24_transfer_label');

        if (this.paymentOptions.p24_time_limit &&
            (this.paymentOptions.p24_time_limit < 0 || this.paymentOptions.p24_time_limit > 99)) {
            throw new P24ValidationError(`p24_time_limit should in range of 0-99`);
        }
        if (this.paymentOptions.p24_wait_for_result &&
            (this.paymentOptions.p24_wait_for_result !== 0 && this.paymentOptions.p24_wait_for_result !== 1)) {
            throw new P24ValidationError(`p24_time_limit should be 0 or 1`);
        }
    }

    private prepareShoppingDetails () {
        let data: any = {};
        this.shoppingDetails.forEach((elem, i) => {
            validateLength(elem.name, 127, `p24_name_${i} : ${elem.name}`)
            validateLength(elem.description, 127, `p24_description_${i} : ${elem.description}`)

            data[`p24_name_${i}`] = elem.name;
            data[`p24_quantity_${i}`] = elem.quantity;
            data[`p24_price_${i}`] = elem.price;
            if (elem.id) {
                data[`p24_number_${i}`] = elem.id;
            }
            if (elem.description) {
                data[`p24_description_${i}`] = elem.description;
            }
        });
        return data;
    }

    /**
     * Builds a payment
     *
     * @param {BaseParameters} baseParams
     * @param {string} salt
     * @returns
     * @memberof Payment
     */
    public build (baseParams: BaseParameters, salt: string) {
        this.validatePayment(); // fail on build
        const shoppingDetails = this.prepareShoppingDetails();
        const crcStr = `${this.paymentOptions.p24_session_id}|${baseParams.p24_merchant_id}|${this.paymentOptions.p24_amount}|${this.paymentOptions.p24_currency}|${salt}`;
        const crc = crypto.createHash('md5').update(crcStr).digest('hex');
        return {
            ...baseParams,
            ...this.paymentOptions,
            ...shoppingDetails,
            p24_sign: crc
        };
    }
}
