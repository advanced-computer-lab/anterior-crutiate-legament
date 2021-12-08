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
            unique: true,
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
            default: undefined,
        }
    },
    {
        timestamps: true
    });



userSchema.methods.updateUser= async userData =>{
    var oldUser=Users.find(userData._id);
    return await Users.findByIdAndUpdate(userData._id,
        {
            firstName: userData.firstName? userData.firstName : oldUser.firstName,
            lastName: userData.lastName ? userData.lastName : oldUser.lastName,
            email: userData.email ? userData.email : oldUser.email,
            password: userData.password ? userData.password : oldUser.password,
            passport: userData.passport ? userData.passport : oldUser.passport,
        },
        {new:true},
    );
};


userSchema.methods.searchUser = async searchFilters => {
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

userSchema.methods.loginUser = async searchFilters => {
    if(Object.keys(searchFilters).length === 0) {
        return undefined;
    }
    else{
        if(searchFilters.email) {
            query.push({email:searchFilters.email}) ;
        }
        if(searchFilters.password) {
            query.push({password:searchFilters.password}) ;
        }
        return await Users.find({$and:query});
    }
}


userSchema.methods.createUser = async requestBody => {
    return await Users.create(requestBody);
}


userSchema.methods.getReservedSeats = async requestBody => {
    return await Users.find({"_id": requestBody.userId}, {reservations: {$elemMatch: {flight_id: requestBody.flightId,cabin: requestBody.cabin}}});

}

userSchema.methods.cancelReservation = async requestBody => {
    return await Users.findByIdAndUpdate(requestBody.userId,
        {$pull:{reservations: {$elemMatch: {flight_id: requestBody.flightId,cabin: requestBody.cabin}}}});
}
userSchema.methods.reserveSeats = async requestBody => {
    var arr = requestBody.seats;
    return await Users.findByIdAndUpdate(requestBody.userId,
        {$push:{reservations: {$elemMatch: {flight_id: requestBody.flightId,cabin: requestBody.cabin}}},arr});
}

var Users = mongoose.model('Users',userSchema);



module.exports = Users;
