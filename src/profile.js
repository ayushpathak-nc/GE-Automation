async function fillProfilePage(page, profileDetails) {
    // Wait for the last name field to load
    await page.waitForSelector('#lastName');

    // Fill out profile details
    await page.fill('#lastName', profileDetails.lastName);
    await page.fill('#firstName', profileDetails.firstName);
    await page.fill('#middleName', profileDetails.middleName || '');

    // Date of Birth
    await page.selectOption('#DOB_month', profileDetails.dobMonth);
    await page.fill('#DOB_day', profileDetails.dobDay);
    await page.fill('#DOB_year', profileDetails.dobYear);

    // Phone Number
    await page.fill('#phoneNumber_0', profileDetails.phoneNumber);

    // Click on the Next button
    await page.click('button[type="submit"]');
}

module.exports = { fillProfilePage };