/**
 * Transaction result
 *
 * @export
 * @interface Transaction
 */
export interface Transaction {
    /**
     * Token obtained
     *
     * @type {string}
     * @memberof Transaction
     */
    token: string,

    /**
     * Link to pay
     *
     * @type {string}
     * @memberof Transaction
     */
    link: string
}