import { OrderCreaetedData } from "./OrderCreaetedData";

export interface OrderCreatedResponse {
    /**
     * Response code
     *
     * @type {string}
     * @memberof OrderCreatedResponse
     */
    responseCode: string,

    /**
     * Response data
     *
     * @type {OrderCreaetedData}
     * @memberof OrderCreatedResponse
     */
    data: OrderCreaetedData
}