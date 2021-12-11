const express = require('express') ;
var userRouter = express.Router () ;

const Flights = new require('../models/Flights.js')() ;
const User = new require('../models/User.js')() ;


 

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


module.exports = userRouter ;