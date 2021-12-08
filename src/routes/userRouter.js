const express = require('express') ;
var userRouter = express.Router () ;

const Flights = new require('../models/Flights.js')() ;
const User = new require('../models/User.js')() ;

// update user information

userRouter.route('/editUserData')
    .put(async (req,res,next)=>{
        await User.updateUser(req.body);
        res.end("User Details Updated");
    })
    .all((req,res,next)=>{
        res.statusCode = 403;
        res.end('operation not supported');
    });


//get the user information
userRouter.route('/getUserDetails')
    .get(async(req,res,next)=>{
        let results = await User.searchUser(JSON.parse(req.query.searchFilters)) ;
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
        await User.createUser(req.body) ;
        res.end('user register');
    })
    .all((req,res,next)=>{
        res.statusCode = 403;
        res.end('operation not supported');
    });

// admin login
userRouter.route('/userLogin')
    .get(async(req,res,next)=>{
        let results = await User.loginUser(JSON.parse(req.query.searchFilters)) ;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })
    .all((req,res,next)=>{
        res.statusCode = 403;
        res.end('operation not supported');
    });


userRouter.route('/cancelReservation')
    .delete(async (req,res,next)=>{
        var result =  await User.cancelReservation(req.body);
        let requestBody = {_id: result.flight_id,seats:  result.seats};
        if(req.cabin === "First") {
            requestBody.firstCabin = true
        } else  if(req.cabin === "Business") {
            requestBody.businessCabin = true
        } else {
            requestBody.economyCabin = true
        }
        Flights.unreserveSeats(requestBody)
        if(result){
            res.send("Reservation cancelled successfully");
        }else{
            res.send("There's no such reservation");
        }
    })
    .all((req,res,next)=>{
        res.statusCode = 403;
        res.end('operation not supported');
    });


userRouter.route('/reserveSeats')
    .delete(async (req,res,next)=>{
        var result =  await User.reserveSeats(req.body);
        let requestBody = {_id: result.flight_id,seats:  result.seats};
        if(req.cabin === "First") {
            requestBody.firstCabin = true
        } else  if(req.cabin === "Business") {
            requestBody.businessCabin = true
        } else {
            requestBody.economyCabin = true
        }
        Flights.reserveSeats(requestBody)
        if(result){
            res.send("Reservation done successfully");
        }else{
            res.send("Error in reservation");
        }
    })
    .all((req,res,next)=>{
        res.statusCode = 403;
        res.end('operation not supported');
    });



module.exports = userRouter ;