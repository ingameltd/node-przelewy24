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
