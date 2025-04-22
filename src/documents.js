async function uploadPassport(page, passportDetails) {
    // Wait for the document type dropdown to load
    await page.waitForSelector('#ddlDocType');

    // Select document type (e.g., Passport)
    await page.selectOption('#ddlDocType', 'PT');

    // Click the "Add Document" button
    await page.click('#app-main-content .row:nth-child(1) .card-panel .row:nth-child(3) .add-card button.btn-primary');

    // Wait for the modal and click "OK"
    await page.waitForSelector('div#notifyInfo.show #notifyBtn');
    await page.click('div#notifyInfo.show #notifyBtn');

    // Fill out passport details
    await page.fill('#txtLastName0_C', passportDetails.lastName);
    await page.fill('#txtGivenName0_C', passportDetails.firstName);
    await page.fill('#txtMiddleName0_C', passportDetails.middleName || '');

    // Passport Number
    await page.fill('#txtDocNumber0_C', passportDetails.passportNumber);

    // Issue Date
    await page.selectOption('#dateOfIssuanceMonth0_C', passportDetails.issuanceMonth);
    await page.fill('#dateOfIssuanceDay0_C', passportDetails.issuanceDay);
    await page.fill('#dateOfIssuanceYear0_C', passportDetails.issuanceYear);

    // Expiration Date
    await page.selectOption('#expirationMonth0_C', passportDetails.expirationMonth);
    await page.fill('#expirationDay0_C', passportDetails.expirationDay);
    await page.fill('#expirationYear0_C', passportDetails.expirationYear);

    // Click the "Next" button
    await page.click('button[type="submit"]');
}

async function uploadDriversLicense(page, licenseDetails) {
    // Wait for the driver's license page to load
    await page.waitForSelector('label[for="haveLicenseYes"]');

    // Do you currently hold a valid driver's license?
    if (licenseDetails.licenseNumber) {
        await page.click('label[for="haveLicenseYes"]');

        // Fill out driver's license details
        await page.fill('#licenseNumber', licenseDetails.licenseNumber);
        await page.selectOption('#state', licenseDetails.state);
        await page.selectOption('#expirationMonth', licenseDetails.expirationMonth);
        await page.fill('#expirationDay', licenseDetails.expirationDay);
        await page.fill('#expirationYear', licenseDetails.expirationYear);
    } else {
        await page.click('label[for="haveLicenseNo"]');
    }

    // Click the "Next" button
    await page.click('button[type="submit"]');
}

module.exports = { uploadPassport, uploadDriversLicense };