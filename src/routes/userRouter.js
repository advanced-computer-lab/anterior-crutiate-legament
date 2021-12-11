const express = require('express');
var userRouter = express.Router();

const Flights = new require('../models/Flights.js')();
const Users = new require('../models/User.js')();

// user search flights
userRouter.route('/searchFlights')
.get(async(req,res,next)=>{

    const searchFilters = JSON.parse(req.query.searchFilters); 
    var results = [];

    console.log(searchFilters) ;    
    if( searchFilters.from &&
        searchFilters.to  &&
        searchFilters.departure_time && 
        searchFilters.flight_class &&
        searchFilters.adults &&
        searchFilters.childs   
    ) {
        results = await Flights.searchFlights(searchFilters) ;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(results));
})
.all((req,res,next)=>{
    res.statusCode = 403;
    res.end('operation not supported');
});


// update user information
userRouter.route('/editUserData')
    .put(async (req,res,next)=>{
        console.log(req.body);
        await Users.updateUser(JSON.parse(JSON.stringify(req.body)));
        res.end("User Details Updated");
    })
    .all((req,res,next)=>{
        res.statusCode = 403;
        res.end('operation not supported');
    });


//get the user information
userRouter.route('/getUserDetails')
    .get(async(req,res,next)=>{
        console.log(req.query);
        let results = await Users.searchUser(JSON.parse(JSON.stringify(req.query))) ;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })
    .all((req,res,next)=>{
        res.statusCode = 403;
        res.end('operation not supported');
    });

// register a user
 userRouter.route('/userRegister')
    .post(async (req,res,next)=>{
        console.log("HI WORLD!");
        await Users.createUser(JSON.parse(JSON.stringify(req.body))) ;
        res.end('user register');
    })
    .all((req,res,next)=>{
        res.statusCode = 403;
        res.end('operation not supported');
    });

// user login
userRouter.route('/userLogin')
    .get(async(req,res,next)=>{
        let results;
        const info = JSON.parse(JSON.stringify(req.query.signInfo));
        results = await Users.loginUser(info) ;
        console.log(results);
        if(results.length!=0) res.statusCode = 200;
        else res.statusCode = 203;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })
    .all((req,res,next)=>{
        res.statusCode = 403;
        res.end('operation not supported');
    });


userRouter.route('/cancelReservation')
    .put(async (req,res,next)=>{
        await Users.cancelReservation(JSON.parse(JSON.stringify(req.body)));
        let requestBody = {flight_id: req.body.flightId,seats:  req.body.seats};
        if(req.body.cabin === "First") {
            requestBody.firstCabin = true
        } else  if(req.body.cabin === "Business") {
            requestBody.businessCabin = true
        } else {
            requestBody.economyCabin = true
        }
        Flights.unreserveSeats(requestBody)
        res.send("Reservation cancelled successfully");
    })
    .all((req,res,next)=>{
        res.statusCode = 403;
        res.end('operation not supported');
    });


userRouter.route('/reserveSeats')
    .put(async (req,res,next)=>{
        var result =  await Users.reserveSeats(JSON.parse(JSON.stringify(req.body)));
        let requestBody = {_id: result.flight_id,seats:  result.seats};
        console.log(result+"      hello world!");
        if(result.cabin === "First") {
            requestBody.firstCabin = true
        } else  if(result.cabin === "Business") {
            requestBody.businessCabin = true
        } else {
            requestBody.economyCabin = true
        }
        console.log(requestBody+"      hello world!");
        Flights.reserveSeats(requestBody);
        if(result){
            res.send("Reservation done successfully");
        }else{
            res.send("Error in reservation");
        }
    })
    .all((req,res,next)=>{
        console.log(req.body);
        res.statusCode = 403;
        res.end('hello world');
    });




module.exports = userRouter;