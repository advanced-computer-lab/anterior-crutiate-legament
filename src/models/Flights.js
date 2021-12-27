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
        type:[Number],
        default:[],
    },
    firstCabin:{
        type:[Number],
        default:[],
    },
    economyCabin:{
        type:[Number],
        default:[],
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
        Business: flightData.Business ? flightData.Business : oldFlight.Business,
        First: flightData.First ? flightData.First : oldFlight.First,
        adultEconomyPrice: flightData.adultEconomyPrice ? flightData.adultEconomyPrice : oldFlight.adultEconomyPrice,
        adultBusinessPrice: flightData.adultBusinessPrice ? flightData.adultBusinessPrice : oldFlight.adultBusinessPrice,
        adultFirstPrice: flightData.adultFirstPrice ? flightData.adultFirstPrice : oldFlight.adultFirstPrice,
        childEconomyPrice: flightData.childEconomyPrice ? flightData.childEconomyPrice : oldFlight.childEconomyPrice,
        childBusinessPrice: flightData.childBusinessPrice ? flightData.childBusinessPrice : oldFlight.childBusinessPrice,
        childFirstPrice: flightData.childFirstPrice ? flightData.childFirstPrice : oldFlight.childFirstPrice,
    },
    {new:true},
   );
};


flightSchema.methods.searchFlights = async searchFilters => {
    if(Object.keys(searchFilters).length === 0) {
        return await Flights.find({});
    }
    else if (searchFilters._id) {
        return await Flights.find({_id: searchFilters._id});
    }
    else {
        let query = [] ;
        if(searchFilters.flight_number) {
            query.push({flight_number:searchFilters.flight_number});
        }
        if(searchFilters.from) {
            query.push({from:{'$regex' : searchFilters.from , '$options' : 'i'}});
        }
        if(searchFilters.to) {
            query.push({to:{'$regex' : searchFilters.to , '$options' : 'i'}}) ;
        }
        if(searchFilters.departure_time) {
            query.push({departure_time:{$gte:searchFilters.departure_time}}) ;
        }
        if(searchFilters.arrival_time) {
            query.push({departure_time:{$lte:searchFilters.arrival_time}}) ;
        }
        if(searchFilters.flight_class == 'Economy') {
            query.push({Economy:{$gte:parseInt(searchFilters.adults)+parseInt(searchFilters.childs)}}) ;
        }
        else if(searchFilters.flight_class == 'Business') {
            const num = parseInt(searchFilters.adults)+parseInt(searchFilters.childs) ;
            if(num<=0)
                return [];
            query.push({Business:{$gte:num}}) ;
        }
        else if(searchFilters.flight_class == 'First') {
            const num = parseInt(searchFilters.adults)+parseInt(searchFilters.childs) ;
            if(num<=0)
                return [];
            query.push({First:{$gte:num}}) ;
        }
        return await Flights.find({$and:query});
    }
}

flightSchema.methods.createFlight = async requestBody => {
    return await Flights.create(requestBody);
}

flightSchema.methods.reserveSeats = async requestBody => {
    var arr = requestBody.seats;
    console.log(requestBody);
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
    const flight = await Flights.findById(requestBody._id);
    console.log(requestBody);
    console.log(flight);
    if(requestBody.firstCabin){
        var newfirstCabin = [];
        for(j =0; j<flight.firstCabin.length; j++) newfirstCabin.push(flight.firstCabin[j]);
        for(j =0; j<arr.length; j++){
            const index = newfirstCabin.indexOf(arr[j]);
            if (index > -1) {
                newfirstCabin.splice(index, 1);
            }
        }
        return await Flights.findByIdAndUpdate(requestBody._id,
        {firstCabin:newfirstCabin});}
    else if(requestBody.businessCabin){
        var newBusinessCabin = [];
        for(j =0; j<flight.businessCabin.length; j++) newBusinessCabin.push(flight.businessCabin[j]);
        for(j =0; j<arr.length; j++){
            const index = newBusinessCabin.indexOf(arr[j]);
            if (index > -1) {
                newBusinessCabin.splice(index, 1);
            }
        }
        return await Flights.findByIdAndUpdate(requestBody._id,
            {businessCabin:newBusinessCabin});}
    else if(requestBody.economyCabin){
        var newEconomyCabin = [];
        for(j =0; j<flight.economyCabin.length; j++) newEconomyCabin.push(flight.economyCabin[j]);
        for(j =0; j<arr.length; j++){
            const index = newEconomyCabin.indexOf(arr[j]);
            if (index > -1) {
                newEconomyCabin.splice(index, 1);
            }
        }
        return await Flights.findByIdAndUpdate(requestBody._id,
            {economyCabin:newEconomyCabin});}
}


var Flights = mongoose.model('Flights',flightSchema);

module.exports = Flights ;
