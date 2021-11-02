const express = require('express') ;
var adminRouter = express.Router () ;


const Flights = require('../models/Flights') ;


//get all flights in the database, if there is no filter (empty body) ... to be modified later if the database got big to return a query results with reasonable number.
//get the all flights having some search filters

adminRouter.route('/adminSearchFlights')
.get((req,res,next)=>{
    console.log(req.params);
    if(req.params.constructor === Object && Object.keys(req.params).length === 0){   
        Flights.find({})
        .then((result)=>{
            console.log(result);
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        },(err)=>{next(err)})
        .catch((err)=>{next(err)});
    }
    else if(req.params.flight_number){                              //if searching is done by flight number >>> it is unique               
        Flights.find({flight_number: req.params.flight_number})
        .then((result)=>{
            console.log(result);
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        },(err)=>{next(err)})
        .catch((err)=>{next(err)});
    }
    else{
        let query = [] ;
        if(req.params.from){
            query.push({from:req.params.from}); 
        }
        if(req.params.to){
            query.push({to:req.params.to}) ; 
        }
        if(req.params.departure_time){
            query.push({departure_time:{$gte:req.params.departure_time}}) ;
        }
        if(req.params.arrival_time){
            query.push({departure_time:{$lte:req.params.arrival_time}}) ;
        }
        Flights.find({query})
        .then((results)=>{
            console.log(result);
            res.setHeader('Content-Type', 'application/json');
            res.send(results);
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