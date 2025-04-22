const { chromium } = require('playwright');
const { solveCaptcha } = require('./utilities'); // Utility function for CAPTCHA solving
const { generateTOTP } = require('./utilities'); // Utility function for TOTP generation

async function loginPage1(page) {
    // Sleep for a random time
    await sleepRandom();

    // Check if the page is correct
    const currentUrl = page.url();
    if (!currentUrl.includes('https://ttp.cbp.dhs.gov/')) {
        console.log('login.js loginPage1 function -> Not on the correct page.');
        return false;
    }

    // Wait for the login button and click it
    await page.waitForSelector('input.login-button');
    await page.click('input.login-button');

    // Sleep for a random time
    await sleepRandom(true);

    // Click on "Consent and Continue"
    await page.click('.modal-footer button.btn-primary');
}

async function loginPage2(page, email, password) {
    // Sleep for a random time
    await sleepRandom();

    // Check if the page is correct
    const currentUrl = page.url();
    if (!currentUrl.includes('https://secure.login.gov/')) {
        console.log('login.js loginPage2 function -> Not on the correct page.');
        return false;
    }

    // Enter login credentials
    await page.fill('input.email', email);
    await page.fill('input.password', password);

    // Solve CAPTCHA
    // const captchaToken = await solveCaptcha('SITE_KEY', 'https://secure.login.gov/');
    // await page.evaluate((token) => {
    //     const captchaElement = document.querySelector('.g-recaptcha-response');
    //     if (captchaElement) {
    //         captchaElement.value = token;
    //     }
    // }, captchaToken);

    // Click the login button
    await page.click('button[type="submit"]');
}

async function loginPage3(page, authKey) {
    // Sleep for a random time
    await sleepRandom();

    // Check if the page is correct
    const currentUrl = page.url();
    if (!currentUrl.includes('https://secure.login.gov/login/two_factor/authenticator')) {
        console.log('login.js loginPage3 function -> Not on the correct page.');
        return false;
    }

    // Generate TOTP code
    const totpCode = generateTOTP(authKey);

    // Enter the TOTP code
    await page.fill('.one-time-code-input__input', totpCode);

    // Click the continue button
    await page.click('button[type="submit"]');
}

async function sleepRandom(short = false) {
    const delay = short ? Math.random() * 1000 + 2000 : Math.random() * 4000 + 8000;
    return new Promise(resolve => setTimeout(resolve, delay));
}

module.exports = { loginPage1, loginPage2, loginPage3 };