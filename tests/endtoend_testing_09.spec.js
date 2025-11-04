// Load Playwright moodule
const {test, expect} = require('@playwright/test')
import {stringFormat} from '../utils/common';   

// Read static JSON file
const bookingAPIResponseBody = require('../test-data/post_dynamic_request_body.json')
const tokenRequestBody = require('../test-data/token_request_body.json')
const putRequestBody = require('../test-data/put_request_body.json')
const patchRequestBody = require('../test-data/patch_request_body.json')

// Write a test // test('', async ()=>{})
test('Create DELETE API Request', async ({request})=>{

    const dynamicRequestBody = stringFormat(JSON.stringify(bookingAPIResponseBody),"testers talk cypress","testers talk performance testing","noodles")

    console.log("=== POST API ===");

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

    const bId = postAPIResponseBody.bookingid

    // Validate JSON API Response Body
    // expect(postAPIResponseBody.firstname).toContain("testers talk playwright");
    expect(postAPIResponseBody.booking).toHaveProperty("firstname","testers talk cypress");
    expect(postAPIResponseBody.booking).toHaveProperty("lastname","testers talk performance testing");

    // Validate nested JSON objects
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01");
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01");

    console.log("=== GET API ===");

    // Create a GET API request to get the created booking
    const getAPIResponse = await request.get(`/booking/${bId}`)
    console.log(await getAPIResponse.json());

    // Validate Status Code
    expect(getAPIResponse.ok()).toBeTruthy();
    expect(getAPIResponse.status()).toBe(200);

    //Generate token
    const tokenResponse = await request.post(`/auth`,{
        data: tokenRequestBody   
    })

    const tokenAPIResposeBody = await tokenResponse.json();
    const tokenNo = tokenAPIResposeBody.token;
    console.log("Token No is : " + tokenNo);

    console.log("=== PUT API ===");

    //PATCH API call
    const patchAPIResponse = await request.patch(`/booking/${bId}`,{
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token=${tokenNo}`
        },
        data: patchRequestBody
    })

    const patchAPIResponseBody = await patchAPIResponse.json();
    console.log(patchAPIResponseBody);
    
    // Validate Status Code
    expect(patchAPIResponse.status()).toBe(200);

    console.log("=== DELETE API ===");

    const deleteAPIResponse = await request.delete(`/booking/${bId}`,{
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token=${tokenNo}`
        }
    })

    // Validate Status Code
    await expect(deleteAPIResponse.status()).toEqual(201);
    await expect(deleteAPIResponse.statusText()).toBe("Created");
})