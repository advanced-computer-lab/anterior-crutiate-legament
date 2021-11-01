const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;


const capinSchema = new Schema({
    Economy:{
        type: Number,
        default:0
    },
    Business:{
        type: Number,
        default:0
    },
    First:{
        type: Number,
        default:0
    },
    
});

const flightSchema = new Schema ({
    flight_number:{
        type: Number,
        unique: true,
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

var Flights = mongoose.model('Flights',flightSchema);

module.exports = Flights;