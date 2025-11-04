// Load Playwright moodule
const {test, expect} = require('@playwright/test')

// Write a test // test('', async ()=>{})
test('Create POST API Request using static request Body', async ({request})=>{

    // Create a POST API request to create a new booking
    const postAPIResponse = await request.post('/booking',{
        data:{
            "firstname": "testers talk playwright",
            "lastname": "testers talk api testing",
            "totalprice": 1000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "super bowls"
            }
    })

    // Validate Status Code
    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);

    // Print Response Body  
    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    // Validate JSON API Response Body
    // expect(postAPIResponseBody.firstname).toContain("testers talk playwright");
    expect(postAPIResponseBody.booking).toHaveProperty("lastname","testers talk api testing");
    expect(postAPIResponseBody.booking).toHaveProperty("totalprice",1000);

    // Validate nested JSON objects
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01");
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01");

})