async function finalReview(page) {
    // Wait for the final review page to load
    await page.waitForSelector('#confirmPersonal');

    // Confirm personal information
    await page.click('#confirmPersonal');
    await sleepRandom();

    // Confirm documents
    await page.click('#confirmDocuments');
    await sleepRandom();

    // Confirm address
    await page.click('#confirmAddress');
    await sleepRandom();

    // Click the "Next" button
    await page.click('button[type="submit"]');
}

async function certifyAndPay(page) {
    // Wait for the certification page to load
    await page.waitForSelector('label[for="certify"]');

    // Certify the application
    await page.click('label[for="certify"]');
    await sleepRandom();

    // Click the "Next" button
    await page.click('button[type="submit"]');
}

module.exports = { finalReview, certifyAndPay };