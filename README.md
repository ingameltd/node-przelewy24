# Przelewy24 for NodeJS

![](https://img.shields.io/github/workflow/status/kasvith/node-przelewy24/Build) ![](https://img.shields.io/github/license/kasvith/node-przelewy24) ![](https://img.shields.io/npm/v/@kasvith/node-przelewy24) ![](https://img.shields.io/github/last-commit/kasvith/node-przelewy24)

NodeJS Library for Przelewy24. This library is written in Typescript to provide
best typesafety.

This library provides an elegant way to create/verify transactions easily.

## Installation

```bash
npm install --save @kasvith/node-przelewy24
```

## Typescript

### Importing

```typescript
import { Przelewy24, PaymentOptions, ShoppingDetail, TransactionVerification } from '@kasvith/node-przelewy24';
```

### Initialization

```typescript
const p24 = new Przelewy24(MERCHANT_ID, POS_ID, 'SALT', TEST_MODE);
```

### Testing connection

```typescript
const result = await p24.testConnection();
console.log(result); // true on success or an error being throw P24Error
```

### Get payment link

Prepare following details to initiate a payment

```typescript
// prepare payment options(required)
const paymentParam: PaymentOptions = {
        p24_amount: 1250, // 12.50PLN -> 1250
        p24_country: CountryCode.Poland, // set country codes
        p24_currency: CurrencyType.PLN, // set currency
        p24_description: 'a fancy item', // set description
        p24_email: 'jhondoe@gmail.com', // customer's email
        p24_session_id: 'kdsfksfklfklfffl', // a unique id from merchant's system
        p24_url_return: 'http://myawesomeapp.com/p24callback' // callback
    };

// prepare shopping details(optional)
const shoppingDetails: ShoppingDetail[] = [
        { name: 'a book', price: 13, quantity: 4 },
        { name: 'a pen', price: 13, quantity: 1 },
        ...
    ];

const result = await p24.getPaymentLink(new Payment(paymentParam, shoppingDetails));
console.log(result) // prints a valid url to pay the payment or throws an error
```

### Verifies a payment

Verifies a payment on p24 system. Once a sucessfull payment happen, callback url is triggered with a `POST` request containing all the details for verify a transaction. When this happens the transaction becomes valid. `TransactionVerification` model is used to verify a transaction.

```typescript
// extract all information from callback request
const { 
    p24_merchant_id,
    p24_pos_id,
    p24_session_id,
    p24_amount,
    p24_currency,
    p24_order_id
} = req.body;

const verification: TransactionVerification = {
    p24_merchant_id: p24_merchant_id,
    p24_pos_id: p24_pos_id,
    p24_session_id: p24_session_id,
    p24_amount: p24_amount,
    p24_currency: p24_currency,
    p24_order_id: p24_order_id,
    p24_sign: p24_sign
}

const result = await p24.verifyTransaction(verification)
console.log(result) // true on success or throws an error

```
