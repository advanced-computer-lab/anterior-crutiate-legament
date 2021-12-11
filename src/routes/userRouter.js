const express = require('express');
var userRouter = express.Router();

const Flights = new require('../models/Flights.js')();
const Users = new require('../models/User.js')();

// update user information

userRouter.route('/editUserData')
    .put(async (req, res, next) => {
        console.log(req.body);
        await Users.updateUser(JSON.parse(JSON.stringify(req.body)));
        res.end("User Details Updated");
    })
    .all((req, res, next) => {
        res.statusCode = 403;
        res.end('operation not supported');
    });


//get the user information
userRouter.route('/getUserDetails')
    .get(async (req, res, next) => {
        let results = await Users.searchUser(JSON.parse(req.query.in));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })
    .all((req, res, next) => {
        res.statusCode = 403;
        res.end('operation not supported');
    });

// register a user
userRouter.route('/userRegister')
    .post(async (req, res, next) => {
        await Users.createUser(JSON.parse(JSON.stringify(req.body)));
        res.end('user register');
    })
    .all((req, res, next) => {
        res.statusCode = 403;
        res.end('operation not supported');
    });

// admin login
userRouter.route('/userLogin')
    .get(async (req, res, next) => {
        let results = await Users.loginUser(JSON.parse(JSON.stringify(req.body)));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })
    .all((req, res, next) => {
        res.statusCode = 403;
        res.end('operation not supported');
    });


userRouter.route('/cancelReservation')
    .delete(async (req, res, next) => {
        var result = await Users.cancelReservation(JSON.parse(JSON.stringify(req.body)));
        let requestBody = { _id: result.flight_id, seats: result.seats };
        if (req.cabin === "First") {
            requestBody.firstCabin = true
        } else if (req.cabin === "Business") {
            requestBody.businessCabin = true
        } else {
            requestBody.economyCabin = true
        }
        Flights.unreserveSeats(requestBody)
        if (result) {
            res.send("Reservation cancelled successfully");
        } else {
            res.send("There's no such reservation");
        }
    })
    .all((req, res, next) => {
        res.statusCode = 403;
        res.end('operation not supported');
    });


userRouter.route('/reserveSeats')
    .delete(async (req, res, next) => {
        var result = await Users.reserveSeats(JSON.parse(JSON.stringify(req.body)));
        let requestBody = { _id: result.flight_id, seats: result.seats };
        if (req.cabin === "First") {
            requestBody.firstCabin = true
        } else if (req.cabin === "Business") {
            requestBody.businessCabin = true
        } else {
            requestBody.economyCabin = true
        }
        Flights.reserveSeats(requestBody)
        if (result) {
            res.send("Reservation done successfully");
        } else {
            res.send("Error in reservation");
        }
    })
    .all((req, res, next) => {
        res.statusCode = 403;
        res.end('operation not supported');
    });



// Search Flight
userRouter.route('/searchFlights')
    .get(async (req, res, next) => {

        const searchFilters = JSON.parse(req.query.searchFilters);
        var results = [];

        console.log(searchFilters);
        if (searchFilters.from &&
            searchFilters.to &&
            searchFilters.departure_time &&
            searchFilters.flight_class &&
            searchFilters.adults &&
            searchFilters.childs
        ) {
            results = await Flights.searchFlights(searchFilters);
            results = results.map(({ _id, flight_number, from, to, departure_time, arrival_time }) => ({ _id, flight_number, from, to, departure_time, arrival_time }));
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })
    .all((req, res, next) => {
        res.statusCode = 403;
        res.end('operation not supported');
    });


module.exports = userRouter;