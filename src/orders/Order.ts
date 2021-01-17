import { Currency } from "../enums/Currency";
import { Country } from '../enums/Country';
import { Language } from "../enums/Language";
import { Channel } from "../enums/Channel";
import { Encoding } from '../enums/Encoding';
import { CartItem } from './CartItem';
import { Additional } from "./Additional";

/**
 * Represents an order
 *
 * @export
 * @interface Order
 */
export interface Order {
    /**
     * Unique identifier from merchant's system
     *
     * @type {string}
     * @memberof Order
     */
    sessionId: string,

    /**
     * Transaction amount expressed in lowest currency unit, e.g. 1.23 PLN = 123
     *
     * @type {number}
     * @memberof Order
     */
    amount: number,

    /**
     * Currency in ISO code
     *
     * @type {Currency}
     * @memberof Order
     */
    currency: Currency,

    /**
     * Transaction description
     *
     * @type {string}
     * @memberof Order
     */
    description: string,

    /**
     * Customer's e-mail
     *
     * @type {string}
     * @memberof Order
     */
    email: string,

    /**
     * Customer's first name and surname
     *
     * @type {string}
     * @memberof Order
     */
    client?: string,

    /**
     * Customer's address
     *
     * @type {string}
     * @memberof Order
     */
    address?: string,

    /**
     * Customer's postal code
     *
     * @type {string}
     * @memberof Order
     */
    zip?: string,

    /**
     * Customer's city
     *
     * @type {string}
     * @memberof Order
     */
    city?: string,

    /**
     * Country code
     *
     * @type {Country}
     * @memberof Order
     */
    country: Country,

    /**
     * Customer's telephone in the following format: 481321132123
     *
     * @type {string}
     * @memberof Order
     */
    phone?: string,

    /**
     * One of following language codes according to ISO 639-1: bg, cs, de, en, es, fr, hr, hu, it, nl, pl, pt, se, sk
     *
     * @type {Language}
     * @memberof Order
     */
    language: Language,

    /**
     * Payment method ID. List of payment methods provided in the panel or available through API
     *
     * @type {number}
     * @memberof Order
     */
    method?: number,

    /**
     * URL address to which customer will be redirected when transaction is complete
     *
     * @type {string}
     * @memberof Order
     */
    urlReturn: string,

    /**
     * URL address to which transaction status will be send
     *
     * @type {string}
     * @memberof Order
     */
    urlStatus?: string,

    /**
     * Time limit for transaction process, 0 - no limit, max. 99 (in minutes)
     *
     * @type {number}
     * @memberof Order
     */
    timeLimit?: number,

    /**
     * Channel of payment
     *
     * @type {Channel}
     * @memberof Order
     */
    channel?: Channel,

    /**
     * Parameter determines wheter a user should wait for result of the transaction in the transaction 
     * service and be redirected back to the shop upon receiving confirmation or be redirected back to the shop immediately after payment.
     *
     * @type {boolean}
     * @memberof Order
     */
    waitForResult?: boolean,

    /**
     * Acceptance of Przelewy24 regulations:
     * false – display consent on p24 website (default),
     * true – consent granted, do not display.
     * In case the "true" parameter is sent, the consent – worded as follows – must be displayed on the Partner’s website: "I hereby state that I have read the regulations and information obligation of ”Przelewy24”.
     * Under words regulations and information obligation there must be hyperlinks redirecting to websites with these documents. The checkbox must not be ticked by default.
     *
     * @type {boolean}
     * @memberof Order
     */
    regulationAccept?: boolean,

    /**
     * Delivery cost
     *
     * @type {number}
     * @memberof Order
     */
    shipping?: number,

    /**
     * Description forwarded to transfer's description (not in every payment methods).
     *
     * @type {string}
     * @memberof Order
     */
    transferLabel?: string,

    /**
     * The parameter is necessary while using SDK libraries. 
     * The value passed in mobileLib parameter is always 1 and value passed in sdkVersion determines which version of library should be used.
     *
     * @type {number}
     * @memberof Order
     */
    mobileLib?: number,

    /**
     * Version of mobile library. Determines if transaction is mobile.
     *
     * @type {string}
     * @memberof Order
     */
    sdkVersion?: string,

    /**
     * Coding system for characters sent: ISO-8859-2, UTF-8, Windows-1250
     *
     * @type {Encoding}
     * @memberof Order
     */
    encoding?: Encoding,

    /**
     * Special parameter for some payment flows e.g. BLIK and Card one-click.
     *
     * @type {string}
     * @memberof Order
     */
    methodRefId?: string,

    /**
     * cart items
     *
     * @type {CartItem[]}
     * @memberof Order
     */
    cart?: CartItem[],

    /**
     * Set of additional information about the transaction or the payer
     *
     * @type {Additional}
     * @memberof Order
     */
    additional?: Additional
}