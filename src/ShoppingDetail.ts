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
    quantity: number;
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
