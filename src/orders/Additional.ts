import { Shipping } from "./Shipping";

/**
 * Additional shipping data
 *
 * @export
 * @interface Additional
 */
export interface Additional {
    /**
     * Additional shipping information
     *
     * @type {Shipping}
     * @memberof Additional
     */
    shipping?: Shipping
}