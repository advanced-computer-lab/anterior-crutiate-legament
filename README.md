# GUC AIR
![HomePage](https://i.ibb.co/d0K6LJ2/HomePage.png)

## Table of Contents
- [Project Description](#project-description)
- [Tools and Frameworks](#tools-and-frameworks)
- [Features](#features)
  * [Admin Functionalities](#administrator)
  * [User/Guest Functionalities](#user)
- [API References](#api-references)
  * [Admin Router](#admin-router)
  * [User Router](#user-router)



## Project Description

### Course 
Advanced Computer Lab (CSEN 704/ DMET 706), Winter 2021

### Theme
The theme of the project, is to create a complete Airline Reservation System. An Airline
Reservation System is a web application through which individuals can reserve and pay
for flights in order to travel to different countries and sometimes domestic cities. Each
airline usually has its own website through which reservations (bookings) can be made.
Such websites include EgyptAir.com, Emirates.com, Lufthansa.com and AirCanada.com

### Overview 
This project followed the Agile Methodology; meaning it was splited into Sprints, with
each Sprint lasting a set amount of time and a fully functioning version of the project
with the specified System Requirements should be submitted and evaluated.

### Objectives
- Learn how to properly use the Agile Methodology to plan out a project and develop
the software.
- Learn the process of following a given set of System Requirements to develop a
software.
- Learn to research and master the use of the MERN Stack.
- Learn how to work together as a team on GitHub.


## Tools and Frameworks
![MERN_STACK](https://www.sbr-technologies.com/wp-content/uploads/2021/07/Mern-Stack-Developer.png)

### What is the MERN Stack?
MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.

- MongoDB - document database
- Express(.js) - Node.js web framework
- React(.js) - a client-side JavaScript framework
- Node(.js) - the premier JavaScript web server

Express and Node make up the middle (application) tier. Express.js is a server-side web framework, and Node.js the popular and powerful JavaScript server platform. Regardless of which variant you choose, ME(RVA)N is the ideal approach to working with JavaScript and JSON, all the way through.

### How does the MERN stack work?
The MERN architecture allows you to easily construct a 3-tier architecture (frontend, backend, database) entirely using JavaScript and JSON.

![MERN_ARCH](https://webimages.mongodb.com/_com_assets/cms/mern-stack-b9q1kbudz0.png?auto=format%2Ccompress)

#### - React.js Front End
The top tier of the MERN stack is React.js, the declarative JavaScript framework for creating dynamic client-side applications in HTML. React lets you build up complex interfaces through simple Components, connect them to data on your backend server, and render them as HTML.

React’s strong suit is handling stateful, data-driven interfaces with minimal code and minimal pain, and it has all the bells and whistles you’d expect from a modern web framework: great support for forms, error handling, events, lists, and more.

#### - Express.js and Node.js Server Tier
The next level down is the Express.js server-side framework, running inside a Node.js server. Express.js bills itself as a “fast, unopinionated, minimalist web framework for Node.js,” and that is indeed exactly what it is. Express.js has powerful models for URL routing (matching an incoming URL with a server function), and handling HTTP requests and responses.

By making XML HTTP Requests (XHRs) or GETs or POSTs from your React.js front-end, you can connect to Express.js functions that power your application. Those functions in turn use MongoDB’s Node.js drivers, either via callbacks for using Promises, to access and update data in your MongoDB database.

#### - MongoDB Database Tier
If your application stores any data (user profiles, content, comments, uploads, events, etc.), then you’re going to want a database that’s just as easy to work with as React, Express, and Node.

That’s where MongoDB comes in: JSON documents created in your React.js front end can be sent to the Express.js server, where they can be processed and (assuming they’re valid) stored directly in MongoDB for later retrieval. Again, if you’re building in the cloud, you’ll want to look at Atlas. If you’re looking to set up your own MERN stack, read on!


## Features 

We have two main users in our website:

### Administrator 
- Log in using his email and password.
![admin_login](https://i.ibb.co/ZfGVd5N/admin-login.png)
- Add another admin to the airline system .
![add_admin](https://i.ibb.co/3hpnH3J/add-admin.png)
- Create flights including all flight details such as flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport.
![add_flight](https://i.ibb.co/1mb69c1/add-flight.png)
- Search through all existing flights using search criteria including flight number, departure and arrival times, dates and airport terminals.
- List of all the available flights without any search criteria.
![search_flight](https://i.ibb.co/D5DFV18/search-flight-admin.png)
- Update any selected flight and its details including flight number, departure and arrival times, number of available Economy seats, number of Business Class seats, dates and airports.
- Delete any selected flights and all their details upon confirmation.
![edit_flight](https://i.ibb.co/17g35zP/edit-flight.png)

### User 
- Sign up and enter their details in a form including first name, last name, home address, country code, telephone number(s), email, passport number and password.
![signup](https://i.ibb.co/yNh3ZDT/register.png)
- Sign in using his email and password.
![signin](https://i.ibb.co/G3csWTw/sing-in.png)
- Edit their information including first name, last name, passport number and email.
![edit_info](https://i.ibb.co/JvBx7jY/edit-info.png)
![edit_pass](https://i.ibb.co/G05gmcn/edit-pass.png)
- Search for available flights based on number of passengers (children and adults), departure airport and arrival airport terminals, departure and arrival dates and cabin class.
- Select one of the flights from the list of available flights.
- See all the details of a particular  flight. The details should include flight number, departure and arrival times, trip duration, cabin class and baggage allowance.
- View a list of all available return flights based on the search criteria.  The list should include flight number, departure time and arrival time, trip duration and price.
![search_flights](https://i.ibb.co/HKDfQX0/search-flight-user.png)
- See a summary of the chosen departure and return flights, including the dates and times of the departure and return flights, the price of each flight, the chosen cabin (Economy/ Business Class), the chosen seat and the total price of the entire ticket.
- View the available seats in the chosen cabin of the chosen departure flight and select one or more of the available seats in the chosen cabin of the chosen departure flight (based on the the number of passengers the booking is for).
- Confirm reserving the chosen flight.
![reserve_seats](https://i.ibb.co/441MVq3/reserve-seats.png)
![child_adult](https://i.ibb.co/zhw7D9b/child-adult.jpg)
- Pay for the reservation using MasterCard or Visa (using Stripe's API).
![payment](https://i.ibb.co/9WGHhvR/payment.png)
- View itinerary (a summary of the chosen departure and return flights, including the dates and times of the departure and return flights, the chosen cabin (Economy/ Business Class), the chosen seat and the total price paid for the entire ticket along with a confirmation/ booking number).
- View all their current reserved flights.
- Cancel a reservation.
-  Edit a reservation by choosing new seats or change the flight.
-  Emailed with any updates in his reservations.
![tickets](https://i.ibb.co/sPmTkwH/tickets.png)
-  View our services that's will make your flight special using GUC AIR.
![service](https://i.ibb.co/fqFM0tY/service.png)
-  Contact us by sending us an email or know more about our software engineers.
![contact_us](https://i.ibb.co/30XwwrJ/contact-us.png)

## API References
Our API is divided into two APIs :

### Admin Router 
#### Route : `/admin`

#### Add Admin
- Route : `/addAdmin`
- Request type : `post`
- Request Body : 
 `
  {
  firstName: 'Omar',
  lastName: 'Tarek',
  email: 'omartarek@gmail.com',
  password: '123',
  message: '',
  token: '"eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IjFAMyIsInBhc3N3b3JkIjoiJDJiJDEwJHdsaHh0ZVVuWXQ0Ni8xWE9kN29RZHVDNXdySEFFL0FoZVVFSzFpanA5cmw1eE9yRnEveDE2In0.9mVIk0b4Qv9
5ajUyRXKNGohy8mJBphb1m4c42WKu5jQ"'
 }
`

#### Log In 
- Route : `/adminLogin`
- Request type : `get`
- Request Query : 
 `
  { 
    loginDetails: '{"email":"omartarek@gmail.com","password":"123"}' 
  }
  `
- Response Body :
 `{"_id":          {"$oid":"61c1cf32abcaed63d42a6aea"},"firstName":"Omar","lastName":"Tarek","email":"1@3","password":"$2b$10$wlhxteUnYt46/1XOd7oQduC5wrHAE/AheUEK1ijp9rl5xOrFq/x16","createdAt":    {"$date":"2021-12-21T12:57:22.511Z"},"updatedAt":{"$date":"2021-12-21T12:57:22.511Z"},"__v":0}
 `

#### Create Flights
- Route : `/adminCreateFlight`
- Request type : `post`
- Request Body :
 `
  {
  flight_number: '1234',
  from: 'Cairo',
  to: 'Luxor',
  departure_time: '2021-12-25T18:15',
  arrival_time: '2021-12-25T19:15',
  Economy: '50',
  Business: '50',
  First: '50',
  adultEconomyPrice: '1000',
  childEconomyPrice: '800',
  adultBusinessPrice: '1200',
  childBusinessPrice: '1000',
  adultFirstPrice: '1500',
  childFirstPrice: '1300',
  token: '"eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im9tYXJ0YXJla0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRETWhoUk9ZYWI3NGtRV3JoTFovOHcuTUNkdTE5L1ZMdE1GdS5tT0NaRWdTTlU4NEV
OT0E4QyJ9.gTAQ3KPYXDjnFd_eN0EQBopVyGZwp5g71r4MnBcMMP4"'
 }
`

#### Search Flights
- Route : `/adminSearchFlights`
- Request type : `get`
- Request Query : 
 `
 {
  searchFilters: '{"from":"Cairo","to":"Luxor","token":"\\"eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im9tYXJ0YXJla0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRETWhoUk9ZYWI3NGt
RV3JoTFovOHcuTUNkdTE5L1ZMdE1GdS5tT0NaRWdTTlU4NEVOT0E4QyJ9.gTAQ3KPYXDjnFd_eN0EQBopVyGZwp5g71r4MnBcMMP4\\""}'
 }
`
- Respone Body : 
 ` 
  [{"_id":"61c7437cd6bff3c8fcdedd58","flight_number":"1234","from":"Cairo","to":"Luxor","departure_time":"2021-12-25T16:15:00.000Z","arrival_time":"2021-12-25T17:15:
00.000Z","Economy":50,"Business":50,"First":50,"childEconomyPrice":800,"childBusinessPrice":1000,"childFirstPrice":1300,"adultEconomyPrice":1000,"adultBusinessPric
e":1200,"adultFirstPrice":1500,"businessCabin":[],"firstCabin":[],"economyCabin":[],"createdAt":"2021-12-25T16:14:52.431Z","updatedAt":"2021-12-25T16:14:52.431Z","
__v":0}]
 `

#### Edit Flights
- Route : `/adminUpdateFlight`
- Request type : `put`
- Request Body : 
`
  {
  _id: '61c7437cd6bff3c8fcdedd58',
  flight_number: '123456',
  from: 'Cairo',
  to: 'Luxor',
  departure_time: '2021-12-27T18:17',
  arrival_time: '2021-12-27T21:17',
  Economy: 50,
  Business: 50,
  First: 50,
  childEconomyPrice: 800,
  childBusinessPrice: 1000,
  childFirstPrice: 1300,
  adultEconomyPrice: 1000,
  adultBusinessPrice: 1200,
  adultFirstPrice: 1500,
  businessCabin: [],
  firstCabin: [],
  economyCabin: [],
  createdAt: '2021-12-25T16:14:52.431Z',
  updatedAt: '2021-12-25T16:14:52.431Z',
  __v: 0,
  token: '"eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im9tYXJ0YXJla0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRETWhoUk9ZYWI3NGtRV3JoTFovOHcuTUNkdTE5L1ZMdE1GdS5tT0NaRWdTTlU4NEV
OT0E4QyJ9.gTAQ3KPYXDjnFd_eN0EQBopVyGZwp5g71r4MnBcMMP4"'
 }
`

#### Delete Flights
- Route : `/adminDeleteFlight`
- Request type : `delete`
- Request Body : 
` 
 {
  searchFilters: '{"token":"\\"eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im9tYXJ0YXJla0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRETWhoUk9ZYWI3NGtRV3JoTFovOHcuTUNkdTE5L1ZMdE1
GdS5tT0NaRWdTTlU4NEVOT0E4QyJ9.gTAQ3KPYXDjnFd_eN0EQBopVyGZwp5g71r4MnBcMMP4\\""}'
 }
`

### User Router
#### Route : (`/user`)

#### Register
- Route : `/userRegister`
- Request type : `post`
- Request Body : 
 `{
  firstName: 'Abdlerhman ',
  lastName: 'Khater',
  email: 'abdelrahmankhater@gmail.com',
  password: '123',
  confirmPassword: '123',
  passport: '123456'
}
`

#### Log in
- Route : `/userLogin`
- Request type : `get`
- Request Query : 
 `
 {
  signInfo: '{"email":"abdelrahmankhater8@gmail.com","password":"123"}'
  }
 `
- Respone Body : 
`
 {
  _id: new ObjectId("61c73b87d1c07f9feae425bd"),
  firstName: 'Abdlerhman ',
  lastName: 'Khater',
  email: 'abdelrahmankhater@gmail.com',
  password: '$2b$10$bXBWzrm.IU4oblIxF056cecJV/Cqc1f8EcraOMzLmoMRbMWLw8ZAC',
  passport: '123456',
  reservations: [],
  createdAt: 2021-12-25T15:40:55.687Z,
  updatedAt: 2021-12-25T15:40:55.687Z,
  __v: 0
}
`

#### View Information
- Route : `/getUserDetails`
- Request type : `get`
- Request Query : 
 `
 {
  in: '{"_id":"61c64ce111745366dead0768","token":"\\"eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im9tYXIuZWxhYnNhd3lAc3R1ZGVudC5ndWMuZWR1LmVnIiwicGFzc3dvcmQiOiIkMmIkMTAkaUZRd
2ZSSmVFY1FMVXZrNHY5MHgzZUY2YnNHS1k1eWhBNVVmRjVuU3YuajZlclhUSWlRdXUifQ.HgNs2Mo18mPpd43Y2CnuZQ8fg6l9DVUuRn_znav8-TE\\""}'
}
`
- Response Body:
`
  [{"_id":"61c64ce111745366dead0768","firstName":"Omar","lastName":"Tarek","email":"omar.elabsawy@student.guc.edu.eg","password":"$2b$10$iFQwfRJeEcQLUvk4v90x3eF6bsGK
Y5yhA5UfF5nSv.j6erXTIiQuu","passport":"1234","reservations":[{"flight_id":"61c74aed660d342530d1f5c1","cabin":"Business","seats":[22,23,25],"price":5500},{"flight_i
d":"61c74b19660d342530d1f5c4","cabin":"Business","seats":[10,13,24],"price":5500}],"createdAt":"2021-12-24T22:42:41.866Z","updatedAt":"2021-12-25T19:21:25.677Z","_
_v":0,"verificationCode":"$2b$10$MNW2m.qS2a70AXAJShF.V.6M.pnNjmUvbH1Gf40R95tvwToikOjpW"}]
`


#### Edit Information
- Route : `/editUserData`
- Request type : `put`
- Request Body : 
 `
  {
  _id: '61c73b87d1c07f9feae425bd',
  firstName: 'Abdlerhman ',
  lastName: 'Khater',
  email: 'abdelrahmankhater@gmail.com',
  passport: '123456789',
  token: '"eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFiZGVscmFobWFuc2VsaW0xNThAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkYlhCV3pybS5JVTRvYmxJeEYwNTZjZWNKVi9DcWMxZjhFY3JhT01
6TG1vTVJiTVdMdzhaQUMifQ.8CTklsSIBJv-5kOkawDtGE_dUcGdzfcLfEVfj-rWcgQ"'
 }
`

#### Search Flights
- Route : `/searchFlights`
- Request type : `get`
- Request Query : 
`
 {
  searchFilters: '{"from":"Cairo","to":"Luxor","departure_time":"2021-12-25T19:10:31.872Z","return_time":"2021-12-25T19:10:31.872Z","flight_class":"Business","adul
ts":"2","childs":"3"}'
 }
`
- Respone Body : 
 `
 [{"_id":"61c74aed660d342530d1f5c1","flight_number":"212113","from":"Cairo","to":"Luxor","departure_time":"2021-12-30T19:45:00.000Z","arrival_time":"2021-12-30T20:4
5:00.000Z","Economy":100,"Business":50,"First":50,"childEconomyPrice":1000,"childBusinessPrice":1500,"childFirstPrice":1800,"adultEconomyPrice":1200,"adultBusiness
Price":2000,"adultFirstPrice":2500,"businessCabin":[],"firstCabin":[],"economyCabin":[],"createdAt":"2021-12-25T16:46:37.012Z","updatedAt":"2021-12-25T16:46:37.012
Z","__v":0},{"_id":"61c76d33d29c95155750e723","flight_number":"1231234","from":"Cairo","to":"Luxor","departure_time":"2021-12-25T19:15:00.000Z","arrival_time":"202
1-12-25T20:15:00.000Z","Economy":100,"Business":50,"First":50,"childEconomyPrice":800,"childBusinessPrice":1000,"childFirstPrice":1400,"adultEconomyPrice":1000,"ad
ultBusinessPrice":1200,"adultFirstPrice":1600,"businessCabin":[],"firstCabin":[],"economyCabin":[],"createdAt":"2021-12-25T19:12:51.364Z","updatedAt":"2021-12-25T1
9:12:51.364Z","__v":0}]
`

#### Reserve Seats in Flights
- Route : `/reserveSeats`
- Request type : `put`
- Request Body : 
 ` 
  {
  userId: '61c64ce111745366dead0768',
  flightId: '61c74b19660d342530d1f5c4',
  seats: [ 10, 13, 24 ],
  cabin: 'Business',
  price: 5500,
  token: '"eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im9tYXIuZWxhYnNhd3lAc3R1ZGVudC5ndWMuZWR1LmVnIiwicGFzc3dvcmQiOiIkMmIkMTAkaUZRd2ZSSmVFY1FMVXZrNHY5MHgzZUY2YnNHS1k1eWhBNVV
mRjVuU3YuajZlclhUSWlRdXUifQ.HgNs2Mo18mPpd43Y2CnuZQ8fg6l9DVUuRn_znav8-TE"'
 }
`

### Pay for reservations 
- Route : `/payment`
- Request type : `post`
- Request Body : 
 ` 
 {
  token: {
    id: 'tok_1KAfnxLXRXUubuQw0O6PmnzZ',
    object: 'token',
    card: {
      id: 'card_1KAfnxLXRXUubuQwBFCa03t8',
      object: 'card',
      address_city: null,
      address_country: null,
      address_line1: null,
      address_line1_check: null,
      address_line2: null,
      address_state: null,
      address_zip: null,
      address_zip_check: null,
      brand: 'Visa',
      country: 'US',
      cvc_check: 'unchecked',
      dynamic_last4: null,
      exp_month: 12,
      exp_year: 2022,
      funding: 'credit',
      last4: '4242',
      name: 'omar tarek',
      tokenization_method: null
    },
    client_ip: '102.42.254.165',
    created: 1640460081,
    livemode: false,
    type: 'card',
    used: false
  },
  email: 'omar.elabsawy@student.guc.edu.eg',
  amount: 9252
}
`

#### View reservations in Flights
- Route : `/flightData`
- Request type : `get`
- Request Query : 
`
{ searchFilters: '{"_id":"61c74aed660d342530d1f5c1"}' }
`
- Respone Body : 
 `
 [{"_id":"61c74aed660d342530d1f5c1","flight_number":"212113","from":"Cairo","to":"Luxor","departure_time":"2021-12-30T19:45:00.000Z","arrival_time":"2021-12-30T20:4
5:00.000Z","Economy":100,"Business":50,"First":50,"childEconomyPrice":1000,"childBusinessPrice":1500,"childFirstPrice":1800,"adultEconomyPrice":1200,"adultBusiness
Price":2000,"adultFirstPrice":2500,"businessCabin":[22,23,25],"firstCabin":[],"economyCabin":[],"createdAt":"2021-12-25T16:46:37.012Z","updatedAt":"2021-12-25T19:2
1:25.548Z","__v":0}]
`


#### Cancel reservations in Flights
- Route : `/cancelReservation`
- Request type : `delete`
- Request Body : 
`
{
  _id: '61c74aed660d342530d1f5c1',
  seats: [ 22, 23, 25 ],
  businessCabin: true
}
`


#### Contact Us
- Route : `/contactUs`
- Request type : `post`
- Request Body : 
`
{
  name: 'Khater',
  email: 'abdelrahmanselim158@gmail.com',
  subject: 'Test Contact Us',
  userMessage: 'HELLO WORLD!'
}
`

