
/**
 * Currency Type 
 *
 * @enum {number}
 */
export enum CurrencyType {
    PLN = 'PLN',
    EUR = 'EUR',
    GBP = 'GPB',
    CZK = 'CZK'
}

/**
 * Country Code
 *
 * @enum {number}
 */
export enum CountryCode {
    Andorra = 'AD',
    Austria = 'AT',
    Belgium = 'BE',
    Cyprus = 'CY',
    CzechRepublic = 'CZ',
    Denmark = 'DK',
    Estonia = 'EE',
    Finland = 'FI',
    France = 'FR',
    Greece = 'EL',
    Spain = 'ES',
    Norway = 'NO',
    Poland = 'PL',
    Portugal = 'PT',
    SanMarino = 'SM',
    Slovakia = 'SK',
    Slovenia = 'SI',
    Switzerland = 'CH',
    Sweden = 'SE',
    Hungary = 'HU',
    GreatBritain = 'GB',
    Italy = 'IT',
    Netherland = 'NL',
    Ireland = 'IE',
    Island = 'IS',
    Lithuania = 'LT',
    Latvia = 'LV',
    Luxemburg = 'LU',
    Malta = 'MT',
    USA = 'US',
    Canada = 'CA',
    Japan = 'JP',
    Ukraine = 'UA',
    Belarus = 'BY',
    Russia = 'RU'
}

/**
 * Language
 *
 * @enum {number}
 */
export enum Language {
    PL = 'pl',
    EN = 'en',
    DE = 'de',
    ES = 'es',
    IT = 'it'
}

/**
 * Base request
 *
 * @interface BaseParameters
 */
export interface BaseParameters {
    /**
     * Merchant ID
     *
     * @type {number}
     * @memberof BaseParameters
     */
    p24_merchant_id: number;

    /**
     * Shop ID (default Merchant ID)
     *
     * @type {number}
     * @memberof BaseParameters
     */
    p24_pos_id: number;

    /**
     * API VERSION default to 3.2
     *
     * @type {string}
     * @memberof BaseParameters
     */
    p24_api_version: string;
}

/**
 * Character Encoding
 *
 * @enum {number}
 */
export enum CharacterEncoding {
    ISO8859 = 'ISO-8859-2',
    UTF8 = 'UTF-8',
    WINDOWS1250 = 'Windows-1250'
}

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
     * @type {string}
     * @memberof PaymentOptions
     */
    p24_country: CountryCode;

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

/**
 * Shopping details
 *
 * @export
 * @interface ShoppingDetail
 */
export interface ShoppingDetail {
    /**
     * Name of item
     *
     * @type {string}
     * @memberof ShoppingDetail
     */
    name: string;

    /**
     * Description for item
     *
     * @type {string}
     * @memberof ShoppingDetail
     */
    description?: string;

    /**
     * Quantity of item
     *
     * @type {string}
     * @memberof ShoppingDetail
     */
    quantity: string;

    /**
     * Price of item(as 100th multiply 1.25PLN as 125)
     * 
     * @type {number}
     * @memberof ShoppingDetail
     */
    price: number;

    /**
     * ID number stored in merchant's system 
     *
     * @type {number}
     * @memberof ShoppingDetail
     */
    id?: number;
}
