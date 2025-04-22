const { chromium } = require('playwright');
const { loginPage1, loginPage2, loginPage3 } = require('./login');
const { paymentPage3 } = require('./payment');
const { fillProfilePage } = require('./profile');
const { uploadPassport, uploadDriversLicense } = require('./documents');
const { fillAddressHistory, fillEmploymentHistory, fillTravelHistory, fillAdditionalInfo } = require('./history');
const { finalReview, certifyAndPay } = require('./submission');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the start page
    await page.goto('https://ttp.cbp.dhs.gov/');

    // Perform login
    await loginPage1(page);
    await loginPage2(page, 'user@example.com', 'password123');
    await loginPage3(page, 'AUTH_KEY');

    // Fill out profile
    const profileDetails = {
        lastName: 'Doe',
        firstName: 'John',
        middleName: '',
        dobMonth: '12',
        dobDay: '25',
        dobYear: '1990',
        phoneNumber: '1234567890',
    };
    await fillProfilePage(page, profileDetails);

    // Upload passport
    const passportDetails = {
        lastName: 'Doe',
        firstName: 'John',
        middleName: '',
        passportNumber: 'A12345678',
        issuanceMonth: '01',
        issuanceDay: '15',
        issuanceYear: '2015',
        expirationMonth: '01',
        expirationDay: '15',
        expirationYear: '2025',
    };
    await uploadPassport(page, passportDetails);

    // Upload driver's license
    const licenseDetails = {
        licenseNumber: 'D1234567',
        state: 'CA',
        expirationMonth: '12',
        expirationDay: '31',
        expirationYear: '2025',
    };
    await uploadDriversLicense(page, licenseDetails);

    // Fill address history
    const addressDetails = {
        current: {
            startMonth: '01',
            startYear: '2020',
            street: '123 Main St',
            city: 'New York',
            zip: '10001',
        },
        previous: {
            street: '456 Elm St',
            city: 'Los Angeles',
            zip: '90001',
        },
    };
    await fillAddressHistory(page, addressDetails);

    // Fill employment history
    const employmentDetails = {
        current: {
            status: 'employed',
            startMonth: '01',
            startYear: '2020',
            employerName: 'Tech Corp',
            address: '789 Tech St',
            city: 'San Francisco',
            country: 'US',
        },
        previous: {
            status: 'self-employed',
            startMonth: '01',
            startYear: '2015',
            employerName: 'Freelance Inc',
            address: '123 Freelance Ave',
            city: 'Los Angeles',
            country: 'US',
        },
    };
    await fillEmploymentHistory(page, employmentDetails);

    // Fill travel history
    const travelDetails = {
        countriesVisited: ['France', 'Germany', 'Japan'],
    };
    await fillTravelHistory(page, travelDetails);

    // Fill additional information
    const additionalInfo = {
        convictedCriminal: true,
        convictedCriminalDetails: 'Details about the conviction.',
        waiverInadmissibility: false,
        waiverInadmissibilityDetails: '',
        violationCustomsLaws: true,
        violationCustomsLawsDetails: 'Details about customs violation.',
        violationImmigrationLaws: false,
        violationImmigrationLawsDetails: '',
    };
    await fillAdditionalInfo(page, additionalInfo);

    // Perform final review
    await finalReview(page);

    // Certify and pay
    await certifyAndPay(page);

    // Perform payment
    const paymentDetails = {
        cardholderName: 'John Doe',
        cardNumber: '4111111111111111',
        expirationMonth: '12',
        expirationYear: '2025',
        cvv: '123',
    };
    await paymentPage3(page, paymentDetails);

    // Close the browser
    await browser.close();
})();