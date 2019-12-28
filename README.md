# Przelewy24 for NodeJS

NodeJS Library for Przelewy24. This library is written in Typescript to provide
best typesafety.

This library provides an elegant way to create/verify transactions easily.

```typescript
const p24 = new Przelewy24(1234, 12, 'dsfsdfs', true)

async function test () {
    try {
        const r = await p24.testConnection()
        console.log(r)
    } catch (error) {

        console.log(error)
    }

    const paymentParam: PaymentOptions = {
        p24_amount: 100,
        p24_country: CountryCode.Poland,
        p24_currency: CurrencyType.PLN,
        p24_description: 'test',
        p24_email: 'abc@12.com',
        p24_session_id: '122223333',
        p24_url_return: 'http://lcff.com'
    }

    const sd1: ShoppingDetail[] = [
        { name: 'wewe', price: 133, quantity: 4 },
        { name: '11wewe', price: 13, quantity: 1 }
    ]
    await p24.getPaymentLink(new Payment(paymentParam, sd1))
}

test()
```
