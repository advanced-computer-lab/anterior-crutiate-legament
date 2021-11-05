const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;


const flightSchema = new Schema ({
    flight_number:{
        type: String,
        required: true
    },
    from: {
        type: String,
        required : true
    },
    to: {
        type: String,
        required: true 
    },
    departure_time: {
        type: Date,
        required: true
    },
    arrival_time:{
        type: Date,
        required: true
    },
    Economy:{
        type: Number,
        default:0,
        min:0
    },
    Business:{
        type: Number,
        default:0,
        min: 0
    },
    First:{
        type: Number,
        default:0,
        min:0
    }
},
{ 
    timestamps: true 
});




flightSchema.methods.searchFlights = async searchFilters => {

    if(Object.keys(searchFilters).length === 0) {   
        return await Flights.find({}); 
    } 
    else if (searchFilters._id) {                              //if searching is done by _id >>> it is unique               
        return await Flights.find({_id: searchFilters._id});
    }
    else {
        let query = [] ;
        if(searchFilters.flight_number) {
            query.push({flight_number:searchFilters.flight_number}); 
        }
        if(searchFilters.from) {
            query.push({from:searchFilters.from}); 
        }
        if(searchFilters.to) {
            query.push({to:searchFilters.to}) ; 
        }
        if(searchFilters.departure_time) {
            query.push({departure_time:{$gte:searchFilters.departure_time}}) ;
        }
        if(searchFilters.arrival_time) {
            query.push({departure_time:{$lte:searchFilters.arrival_time}}) ;
        }
        return  await Flights.find({$and:query});
    }
 }

flightSchema.methods.createFlight = async requestBody => {
    return await Flights.create(requestBody);
}

var Flights = mongoose.model('Flights',flightSchema);



module.exports = Flights;
