async function fillAddressHistory(page, addressDetails) {
    // Wait for the address history page to load
    await page.waitForSelector('#startMonth_0');

    // Address 1 - Current/Present
    await page.selectOption('#startMonth_0', addressDetails.current.startMonth);
    await page.fill('#startYear_0', addressDetails.current.startYear);
    await page.fill('#addressLine1_0', addressDetails.current.street);
    await page.fill('#city_0', addressDetails.current.city);
    await page.fill('#zip_0', addressDetails.current.zip);

    // Address 2 - Previous
    if (addressDetails.previous) {
        await page.fill('#addressLine1_1', addressDetails.previous.street);
        await page.fill('#city_1', addressDetails.previous.city);
        await page.fill('#zip_1', addressDetails.previous.zip);
    }

    // Click the "Next" button
    await page.click('button[type="submit"]');
}

async function fillEmploymentHistory(page, employmentDetails) {
    // Wait for the employment history page to load
    await page.waitForSelector('#addEmploymentButton');

    // Employment 1 - Current/Present
    await page.click('#addEmploymentButton');
    await sleepRandom();

    // Select employment status
    await page.selectOption('#status0', employmentDetails.current.status);

    // Employment start date
    await page.selectOption('#startMonth0', employmentDetails.current.startMonth);
    await page.fill('#startYear0', employmentDetails.current.startYear);

    // Employer details
    await page.fill('#employerName0', employmentDetails.current.employerName);
    await page.fill('#employerAddress0', employmentDetails.current.address);
    await page.fill('#employerCity0', employmentDetails.current.city);
    await page.selectOption('#employerCountry0', employmentDetails.current.country);

    // Employment 2 - Previous (if exists)
    if (employmentDetails.previous) {
        await page.click('#addEmploymentButton');
        await sleepRandom();

        await page.selectOption('#status1', employmentDetails.previous.status);
        await page.selectOption('#startMonth1', employmentDetails.previous.startMonth);
        await page.fill('#startYear1', employmentDetails.previous.startYear);
        await page.fill('#employerName1', employmentDetails.previous.employerName);
        await page.fill('#employerAddress1', employmentDetails.previous.address);
        await page.fill('#employerCity1', employmentDetails.previous.city);
        await page.selectOption('#employerCountry1', employmentDetails.previous.country);
    }

    // Click the "Next" button
    await page.click('button[type="submit"]');
}

async function fillTravelHistory(page, travelDetails) {
    // Wait for the travel history page to load
    await page.waitForSelector('label[for="haveYouTraveledYes"]');

    // Have you traveled to countries other than the United States, Canada, and Mexico since July 2016?
    if (travelDetails.countriesVisited && travelDetails.countriesVisited.length > 0) {
        await page.click('label[for="haveYouTraveledYes"]');

        // Add countries visited
        for (let i = 0; i < travelDetails.countriesVisited.length; i++) {
            await page.fill(`#countryVisited_${i}`, travelDetails.countriesVisited[i]);
            await page.click(`#addCountryButton_${i}`);
        }
    } else {
        await page.click('label[for="haveYouTraveledNo"]');
    }

    // Click the "Next" button
    await page.click('button[type="submit"]');
}

async function fillAdditionalInfo(page, additionalInfo) {
    // Wait for the additional information page to load
    await page.waitForSelector('label#question_0_yes_label');

    // Have you ever been convicted of a criminal offense?
    if (additionalInfo.convictedCriminal) {
        await page.click('label#question_0_yes_label');
        await page.fill('#question_0_required_details', additionalInfo.convictedCriminalDetails);
    } else {
        await page.click('label#question_0_no_label');
    }

    // Have you ever received a waiver of inadmissibility?
    if (additionalInfo.waiverInadmissibility) {
        await page.click('label#question_1_yes_label');
        await page.fill('#question_1_required_details', additionalInfo.waiverInadmissibilityDetails);
    } else {
        await page.click('label#question_1_no_label');
    }

    // Have you ever been found in violation of customs laws?
    if (additionalInfo.violationCustomsLaws) {
        await page.click('label#question_2_yes_label');
        await page.fill('#question_2_required_details', additionalInfo.violationCustomsLawsDetails);
    } else {
        await page.click('label#question_2_no_label');
    }

    // Have you ever been found in violation of immigration laws?
    if (additionalInfo.violationImmigrationLaws) {
        await page.click('label#question_3_yes_label');
        await page.fill('#question_3_required_details', additionalInfo.violationImmigrationLawsDetails);
    } else {
        await page.click('label#question_3_no_label');
    }

    // Click the "Next" button
    await page.click('button[type="submit"]');
}

module.exports = { fillAddressHistory, fillEmploymentHistory, fillTravelHistory, fillAdditionalInfo };