import { ShippingType } from "../enums/ShippingType";

export interface Shipping {
    /**
     * Type of shipment
     *
     * @type {ShippingType}
     * @memberof Shipping
     */
    type: ShippingType,

    /**
     * Shipment address: street and number
     *
     * @type {string}
     * @memberof Shipping
     */
    address: string,

    /**
     * Shipment zip code
     *
     * @type {string}
     * @memberof Shipping
     */
    zip: string,

    /**
     * Shipment city
     *
     * @type {string}
     * @memberof Shipping
     */
    city: string,

    /**
     * Shipment country
     *
     * @type {string}
     * @memberof Shipping
     */
    country: string
}