/**
 * Channels of payment
 *
 * @export
 * @enum {number}
 */
export enum Channel {
    Card = 1,
    Transfer = 2,
    TraditionalTransfer = 4,
    NA = 8,
    All = 16,
    UsePrePayment = 32,
    OnlyPayByLink = 64,
    InstalmentPaymentForms = 128,
    WalletsToActivate = 256
}