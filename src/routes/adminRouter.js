const express = require('express') ;
var adminRouter = express.Router () ;

const Flights = new require('../models/Flights.js')() ;
const Admin = new require('../models/Admin.js')() ;



// delete Flight record by its mongoDB id
adminRouter.route('/adminDeleteFlight')
.delete(async (req,res,next)=>{
    var result =  await Flights.deleteFlight(req.body._id);
    if(result){
        res.send("Flight deleted successfully");
    }else{
        res.send("There's no such flight");
    }
})
.all((req,res,next)=>{
    res.statusCode = 403;
    res.end('operation not supported');
});


// update flight information

adminRouter.route('/adminUpdateFlight')
.put(async (req,res,next)=>{
    await Flights.updateFlight(req.body);
    res.end("Flight Updated");
})
.all((req,res,next)=>{
    res.statusCode = 403;
    res.end('operation not supported');
});


//get all flights in the database, if there is no filter (empty body) ... to be modified later if the database got big to return a query results with reasonable number.
//get the all flights having some search filters
adminRouter.route('/adminSearchFlights')
.get(async(req,res,next)=>{
    let results = await Flights.searchFlights(JSON.parse(req.query.searchFilters)) ;
    res.setHeader('Content-Type', 'application/json');
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

// admin login
adminRouter.route('/adminLogin')
    .get(async(req,res,next)=>{
        let results = await Admin.loginAdmin(JSON.parse(req.query.searchFilters)) ;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })
    .all((req,res,next)=>{
        res.statusCode = 403;
        res.end('operation not supported');
    });
adminRouter()


module.exports = adminRouter ;