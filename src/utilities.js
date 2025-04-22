const axios = require('axios');
const otplib = require('otplib');

// Sleep for a random time
async function sleepRandom(short = false) {
    const delay = short ? Math.random() * 1000 + 2000 : Math.random() * 4000 + 8000;
    return new Promise(resolve => setTimeout(resolve, delay));
}

async function click(page, selector) {
    await page.waitForSelector(selector);
    await page.click(selector);
}

async function waitForSelector(page, selector, hidden = false) {
    await page.waitForSelector(selector, { state: hidden ? 'hidden' : 'visible' });
}

// Solve CAPTCHA using 2Captcha
async function solveCaptcha(siteKey, url) {
    const apiKey = 'YOUR_2CAPTCHA_API_KEY';
    const response = await axios.post('https://2captcha.com/in.php', {
        key: apiKey,
        method: 'userrecaptcha',
        googlekey: siteKey,
        pageurl: url,
        json: 1,
    });

    const requestId = response.data.request;
    let token;

    // Poll for the CAPTCHA solution
    while (!token) {
        await sleepRandom(true);
        const result = await axios.get(`https://2captcha.com/res.php?key=${apiKey}&action=get&id=${requestId}&json=1`);
        if (result.data.status === 1) {
            token = result.data.request;
        }
    }

    return token;
}

// Generate TOTP code
function generateTOTP(secret) {
    return otplib.authenticator.generate(secret);
}

module.exports = { sleepRandom, click, waitForSelector, solveCaptcha, generateTOTP };