
import { ShoppingDetail } from "./ShoppingDetail";
import { PaymentOptions } from "./PaymentOptions";
import { BaseParameters } from "./BaseParameters";
import crypto from 'crypto';

export class Payment {
    private paymentOptions: PaymentOptions;
    private shoppingDetails: Array<ShoppingDetail>;

    constructor(paymentOptions: PaymentOptions, shoppingDetails: Array<ShoppingDetail> = []) {
        this.paymentOptions = paymentOptions;
        this.shoppingDetails = shoppingDetails;
    }

    private validate () {

    }

    private prepareShoppingDetails () {
        let data: any = {};
        this.shoppingDetails.forEach((elem, i) => {
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
     * build payment
     */
    public build (baseParams: BaseParameters) {
        const shoppingDetails = this.prepareShoppingDetails();
        const crcStr = `${this.paymentOptions.p24_session_id}|${baseParams.p24_merchant_id}|${this.paymentOptions.p24_amount}|${this.paymentOptions.p24_currency}`;
        const crc = crypto.createHash('md5').update(crcStr).digest('hex');
        return {
            ...baseParams,
            ...this.paymentOptions,
            ...shoppingDetails,
            p24_sign: crc
        };
    }
}
