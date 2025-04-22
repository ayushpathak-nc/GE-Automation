const { sleepRandom } = require('./utilities');

async function paymentPage1(page, alreadyPaid) {
    if (alreadyPaid) {
        console.log('Payment already completed.');
        return true;
    }

    // Sleep for a random time
    await sleepRandom();

    // Check if the page is correct
    const currentUrl = page.url();
    if (!currentUrl.includes('https://ttp.cbp.dhs.gov/purchase-summary')) {
        console.log('payment.js paymentPage1 -> Not on the correct page.');
        return false;
    }

    // Check if payment is required
    const paymentNoticeExists = await page.$('label[for="paymentNotice"]');
    if (!paymentNoticeExists) {
        await page.click('.pay-button-part button');
        console.log('Payment not required.');
        await sleepRandom(true);
        return true;
    }

    // Wait for the payment notice and click it
    await page.waitForSelector('label[for="paymentNotice"]');
    await page.click('label[for="paymentNotice"]');
    await sleepRandom(true);

    // Click the confirm button
    await page.click('#confirmBtn');
    await sleepRandom(true);
}

async function paymentPage3(page, paymentDetails) {
    // Sleep for a random time
    await sleepRandom();

    // Check if the page is correct
    const currentUrl = page.url();
    if (!currentUrl.includes('https://www.pay.gov/tcsonline/payment.do')) {
        console.log('payment.js paymentPage3 -> Not on the correct page.');
        return false;
    }

    // Fill out payment details
    await page.fill('#accountHolderName', paymentDetails.cardholderName);
    await page.fill('#accountNumber', paymentDetails.cardNumber);
    await page.selectOption('#expirationMonth', paymentDetails.expirationMonth);
    await page.selectOption('#expirationYear', paymentDetails.expirationYear);
    await page.fill('#cardSecurityCode', paymentDetails.cvv);

    // Click the continue button
    await page.click('button[type="submit"]');
}

module.exports = { paymentPage1, paymentPage3 };