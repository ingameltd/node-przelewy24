import { Przelewy24, PaymentOptions, ShoppingDetail, TransactionVerification, Country, Currency, Payment } from "./index";

(async () => {
    const p24 = new Przelewy24(104514, 104514, '7c977bc94df5338e', true);
    const result = await p24.testConnection()
    console.log(result)

    const paymentParam: PaymentOptions = {
        p24_amount: 125000, // 12.50PLN -> 1250
        p24_country: Country.Poland, // set country codes
        p24_currency: Currency.PLN, // set currency
        p24_description: 'a fancy item', // set description
        p24_email: 'jhondoe@gmail.com', // customer's email
        p24_session_id: '1w1eekdsfksfklfk1lff1fl', // a unique id from merchant's system
        p24_url_return: 'http://myawesomeapp.com/payment_success?order=abc', // return user to following url after a valid transaction
        p24_url_status: 'https://5fde72f9.ngrok.io/p24'
    };

    // prepare shopping details(optional)
    const shoppingDetails: ShoppingDetail[] = [
        { name: 'a book', price: 13, quantity: 4 },
        { name: 'a pen', price: 13, quantity: 1 },
    ];

    const link = await p24.getPaymentLink(new Payment(paymentParam, shoppingDetails))
    console.log(link);

    const verification: TransactionVerification = {
        p24_session_id: '11eekdsfksfklfklfffl',
        p24_amount: 125000,
        p24_currency: 'PLN',
        p24_order_id: 304467462
    }

    const r = await p24.verifyTransaction(verification)
    console.log(r)
})()
