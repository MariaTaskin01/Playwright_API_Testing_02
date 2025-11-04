// Load Playwright moodule
const {test, expect} = require('@playwright/test')
import {stringFormat} from '../utils/common';   

// Read static JSON file
const bookingAPIResponseBody = require('../test-data/post_dynamic_request_body.json')

// Write a test // test('', async ()=>{})
test('Create POST API Request using dynamic JSON File', async ({request})=>{

    const dynamicRequestBody = stringFormat(JSON.stringify(bookingAPIResponseBody),"testers talk cypress","testers talk performance testing","noodles")

    // Create a POST API request to create a new booking
    const postAPIResponse = await request.post('/booking',{
        data: JSON.parse(dynamicRequestBody)
    }) 

    // Validate Status Code
    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);

    // Print Response Body  
    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    // Validate JSON API Response Body
    // expect(postAPIResponseBody.firstname).toContain("testers talk playwright");
    expect(postAPIResponseBody.booking).toHaveProperty("firstname","testers talk cypress");
    expect(postAPIResponseBody.booking).toHaveProperty("lastname","testers talk performance testing");

    // Validate nested JSON objects
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01");
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01");

})