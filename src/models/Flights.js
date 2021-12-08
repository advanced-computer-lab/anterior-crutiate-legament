const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;


  
const flightSchema = new Schema ({
    flight_number:{
        type: String,
        required: true,
    },
    from: {
        type: String,
        required : true,
    },
    to: {
        type: String,
        required: true,
    },
    departure_time: {
        type: Date,
        required: true,
        min: Date()
    },
    arrival_time:{
        type: Date,
        required: true,
        min: this.departure_time
    },
    Economy:{
        type: Number,
        default: 0,
        min:0
    },
    Business:{
        type: Number,
        default: 0,
        min: 0
    },
    First:{
        type: Number,
        default: 0,
        min:0
    },

    childEconomyPrice:{
        type: Number,
        default: 0,
        min:0
    },
    childBusinessPrice:{
        type: Number,
        default: 0,
        min: 0
    },
    childFirstPrice:{
        type: Number,
        default: 0,
        min:0
    },
    adultEconomyPrice:{
        type: Number,
        default: 0,
        min:0
    },
    adultBusinessPrice:{
        type: Number,
        default: 0,
        min: 0
    },
    adultFirstPrice:{
        type: Number,
        default: 0,
        min:0
    },
    businessCabin:{
        type:[[Number]],
        default:undefined,
    },
    firstCabin:{
        type:[[Number]],
        default:undefined,
    },
    economyCabin:{
        type:[[Number]],
        default:undefined,
    }
},
{ 
    timestamps: true 
});


// delete flight using its id
flightSchema.methods.deleteFlight = async flightID=>{
    return await Flights.findByIdAndDelete(flightID);    
};


flightSchema.methods.updateFlight= async flightData =>{
   var oldFlight=Flights.find(flightData._id);
  return await Flights.findByIdAndUpdate(flightData._id,
    {
        flight_number: flightData.flight_number? flightData.flight_number : oldFlight.flight_number,
        from: flightData.from ? flightData.from : oldFlight.from,
        to: flightData.to ? flightData.to : oldFlight.to,
        departure_time: flightData.departure_time ? flightData.departure_time : oldFlight.departure_time,
        arrival_time: flightData.arrival_time ? flightData.arrival_time : oldFlight.arrival_time,
        Economy: flightData.Economy ? flightData.Economy : oldFlight.Economy,
        business: flightData.business ? flightData.business : oldFlight.business,
        First: flightData.First ? flightData.First : oldFlight.First,
    },
    {new:true},
   );
};


flightSchema.methods.searchFlights = async searchFilters => {
    if(Object.keys(searchFilters).length === 0) {   
        return await Flights.find({}); 
    } 
    else if (searchFilters._id) {                  
        console.log(searchFilters._id);            //if searching is done by _id >>> it is unique               
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
        return await Flights.find({$and:query});
    }
 }

flightSchema.methods.createFlight = async requestBody => {
    return await Flights.create(requestBody);
}


flightSchema.methods.reserveSeats = async requestBody => {
    var arr = requestBody.seats;
    if(requestBody.firstCabin){
    return await Flights.findByIdAndUpdate(requestBody._id,
        {$push:{firstCabin:arr}});}
    if(requestBody.businessCabin){
        return await Flights.findByIdAndUpdate(requestBody._id,
            {$push:{businessCabin:arr}});}
    if(requestBody.economyCabin){
        return await Flights.findByIdAndUpdate(requestBody._id,
            {$push:{economyCabin:arr}});}
}

flightSchema.methods.unreserveSeats = async requestBody => {
    var arr = requestBody.seats;
    if(requestBody.firstCabin){
        return await Flights.findByIdAndUpdate(requestBody._id,
        {$pull:{firstCabin:arr}});}
    if(requestBody.businessCabin){
        return await Flights.findByIdAndUpdate(requestBody._id,
            {$pull:{businessCabin:arr}});}
    if(requestBody.economyCabin){
        return await Flights.findByIdAndUpdate(requestBody._id,
            {$pull:{economyCabin:arr}});}
}


var Flights = mongoose.model('Flights',flightSchema);



module.exports = Flights;
