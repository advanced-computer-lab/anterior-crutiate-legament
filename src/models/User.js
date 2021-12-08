const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;



const userSchema = new Schema ({
        firstName:{
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required : true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        passport:{
            type: String,
            required: true,
        },
        reservations: {
            type: [[Schema.Types.Mixed]],
            default: []
        }
    },
    {
        timestamps: true
    });


// delete flight using its id

flightSchema.methods.updateUser= async userData =>{
    var oldFlight=Users.find(userData._id);
    return await Users.findByIdAndUpdate(userData._id,
        {
            firstName: flightData.firstName? flightData.firstName : oldFlight.firstName,
            lastName: flightData.lastName ? flightData.lastName : oldFlight.lastName,
            email: flightData.email ? flightData.email : oldFlight.email,
            password: flightData.password ? flightData.password : oldFlight.password,
            passport: flightData.passport ? flightData.passport : oldFlight.passport,
        },
        {new:true},
    );
};


flightSchema.methods.searchUser = async searchFilters => {
    if(Object.keys(searchFilters).length === 0) {
        return await Users.find({});
    }
    else if (searchFilters._id) {
        console.log(searchFilters._id);            //if searching is done by _id >>> it is unique
        return await Users.find({_id: searchFilters._id});
    }
    else {
        let query = [] ;
        if(searchFilters.firstName) {
            query.push({firstName:searchFilters.firstName});
        }
        if(searchFilters.lastName) {
            query.push({lastName:searchFilters.lastName});
        }
        if(searchFilters.email) {
            query.push({email:searchFilters.email}) ;
        }
        if(searchFilters.passport) {
            query.push({passport:searchFilters.passport}) ;
        }
        return await Users.find({$and:query});
    }
}

flightSchema.methods.createUser = async requestBody => {
    return await Users.create(requestBody);
}


flightSchema.methods.getreservedSeats = async requestBody => {

    return await Users.find({"_id": requestBody.userId}, {reservations: {$elemMatch: {flight_id: requestBody.flightId}}});
}

flightSchema.methods.cancelReservation = async requestBody => {
    return await Users.findByIdAndUpdate(requestBody.userId,
        {$pull:{reservations: {$elemMatch: {flight_id: requestBody.flightId}}}});
}


var Users = mongoose.model('Users',userSchema);



module.exports = Flights;
