const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;


const capinSchema = new Schema({
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
    },
    
});

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
    
    capin: capinSchema
},
{ 
    timestamps: true 
});




flightSchema.methods.searchFlights = async requestBody => {
    let results ;
 
    if(requestBody.constructor === Object && Object.keys(requestBody).length === 0){   
        results = await Flights.find({}); 
    }
       else if(requestBody.flight_number){                              //if searching is done by flight number >>> it is unique               
        results = await Flights.find({flight_number: requestBody.flight_number});
    }
    else{
        let query = [] ;
        if(requestBody.from){
            query.push({from:requestBody.from}); 
        }
        if(requestBody.to){
            query.push({to:requestBody.to}) ; 
        }
        if(requestBody.departure_time){
            query.push({departure_time:{$gte:requestBody.departure_time}}) ;
        }
        if(requestBody.arrival_time){
            query.push({departure_time:{$lte:requestBody.arrival_time}}) ;
        }
        console.log(query) ;
        results = await Flights.find({$and:query});
      
    }   
    return results ;
}

flightSchema.methods.createFlight = async requestBody => {
    return await Flights.create(requestBody);
}

var Flights = mongoose.model('Flights',flightSchema);



module.exports = Flights;