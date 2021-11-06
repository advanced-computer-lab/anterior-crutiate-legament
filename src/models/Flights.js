const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;


  
const flightSchema = new Schema ({
    flight_number:{
        type: String,
        required: true,
    },
    PType:{
        type: String,
        enum : ["Boeing","Airbus","Safran","Raytheon"],
        default:"Boeing"
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
        default: function() {
            switch (this.PType){
                case "Boeing": return 70;
                case "Airbus": return 80;
                case "Safran": return 90;
                case "Raytheon": return 100;
            }
        },
        min:0
    },
    Business:{
        type: Number,
        default:function() {
            switch (this.PType){
                case "Boeing": return 40;
                case "Airbus": return 30;
                case "Safran": return 40;
                case "Raytheon": return 10;
            }
        },
        min: 0
    },
    First:{
        type: Number,
        default:function() {
            switch (this.PType){
                case "Boeing": return 20;
                case "Airbus": return 15;
                case "Safran": return 10;
                case "Raytheon": return 5;
            }
        },
        min:0
    },
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
