// Load Playwright moodule
const {test, expect} = require('@playwright/test')
const{DateTime} = require('luxon');
import {faker} from '@faker-js/faker';

// Write a test // test('', async ()=>{})
test('Create POST API Request using dynamic request Body', async ({request})=>{

    // Generate dynamic data
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int(1000);

    const checkInDate = DateTime.now().toFormat('yyyy-MM-dd');
    const checkOutDate = DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd');

    // Create a POST API request to create a new booking
    const postAPIResponse = await request.post('/booking',{
        data:{
            "firstname": firstName,
            "lastname": lastName,
            "totalprice": totalPrice,
            "depositpaid": true,
            "bookingdates": {
                "checkin": checkInDate,
                "checkout": checkOutDate
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
    expect(postAPIResponseBody.booking).toHaveProperty("lastname",lastName);
    expect(postAPIResponseBody.booking).toHaveProperty("totalprice",totalPrice);

    // Validate nested JSON objects
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", checkInDate);
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout", checkOutDate);

})