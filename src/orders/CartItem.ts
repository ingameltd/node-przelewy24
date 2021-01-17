/**
 * Represents a cart item
 *
 * @export
 * @interface CartItem
 */
export interface CartItem {
    /**
     * Shop ID on the part of Partner
     *
     * @type {string}
     * @memberof CartItem
     */
    sellerId?: string,

    /**
     * Shop category
     *
     * @type {string}
     * @memberof CartItem
     */
    sellerCategory: string,

    /**
     * Product name
     *
     * @type {string}
     * @memberof CartItem
     */
    name?: string,

    /**
     * Product description
     *
     * @type {string}
     * @memberof CartItem
     */
    description?: string,

    /**
     * Product quantity
     *
     * @type {number}
     * @memberof CartItem
     */
    quantity?: number,

    /**
     * Product price
     *
     * @type {number}
     * @memberof CartItem
     */
    price?: number,

    /**
     * Product number
     *
     * @type {number}
     * @memberof CartItem
     */
    number?: number,
}