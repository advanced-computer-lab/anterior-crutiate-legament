const express = require('express') ;
var adminRouter = express.Router () ;

const Flights = new require('../models/Flights')() ;


//get all flights in the database, if there is no filter (empty body) ... to be modified later if the database got big to return a query results with reasonable number.
//get the all flights having some search filters
adminRouter.route('/adminSearchFlights')
.get(async(req,res,next)=>{
    let results = await Flights.searchFlights(req.body) ;
    res.setHeader('Content-Type', 'application/json');
    res.send(results);
    res.end(JSON.stringify(results));
})
.all((req,res,next)=>{
    res.statusCode = 403;
    res.end('operation not supported');
});

//create a flight with flight_number, from, to, departure_time, arrival_time, capin. if error occured, it is returned in the response. 
adminRouter.route('/adminCreateFlight')
.post(async (req,res,next)=>{
    await Flights.createFlight(req.body) ;
    res.end('flight created');  
})
.all((req,res,next)=>{
    res.statusCode = 403;
    res.end('operation not supported');
});

module.exports = adminRouter ;