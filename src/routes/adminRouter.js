const express = require('express') ;
var adminRouter = express.Router () ;


const Flights = require('../models/Flights') ;


//get all flights in the database, if there is no filter (empty body) ... to be modified later if the database got big to return a query results with reasonable number.
//get the all flights having some search filters

adminRouter.route('/adminSearchFlights')
.get((req,res,next)=>{
    
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){   
        Flights.find({})
        .then((result)=>{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        },(err)=>{next(err)})
        .catch((err)=>{next(err)});
    }
    else if(req.body.flight_number){                              //if searching is done by flight number >>> it is unique               
        Flights.find({flight_number: req.body.flight_number})
        .then((result)=>{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        },(err)=>{next(err)})
        .catch((err)=>{next(err)});
    }
    else{
        let query = [] ;
        if(req.body.from){
            query.push({from:req.body.from}); 
        }
        if(req.body.to){
            query.push({to:req.body.to}) ; 
        }
        if(req.body.departure_time){
            query.push({departure_time:{$gte:req.body.departure_time}}) ;
        }
        if(req.body.arrival_time){
            query.push({departure_time:{$lte:req.body.arrival_time}}) ;
        }
        Flights.find({$or:query})
        .then((results)=>{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        },(err)=>{next(err)})
        .catch((err)=>{next(err)});
    }   
})
.all((req,res,next)=>{
    res.statusCode = 403;
    res.end('operation not supported');
});


//create a flight with flight_number, from, to, departure_time, arrival_time, capin. if error occured, it is returned in the response. 
adminRouter.route('/adminCreateFlight')
.post((req,res,next)=>{
    console.log(req.body) ;
    Flights.create(req.body)
    .then((flight)=>{
        res.end('flight created');  
    },(err)=>{next(err)})
    .catch((err)=>{next(err)}); 
})
.all((req,res,next)=>{
    res.statusCode = 403;
    res.end('operation not supported');
});


module.exports = adminRouter ; 