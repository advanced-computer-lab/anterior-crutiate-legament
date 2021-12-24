const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
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
        passport: {
            type: String,
            required: true,
        },
        reservations: {
            type: [Schema.Types.Mixed],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.updateUser = async (userData) => {
    var oldUser = Users.find(userData._id);
    return await Users.findByIdAndUpdate(
        userData._id,
        {
            firstName: userData.firstName ? userData.firstName : oldUser.firstName,
            lastName: userData.lastName ? userData.lastName : oldUser.lastName,
            email: userData.email ? userData.email : oldUser.email,
            password: userData.password ? await bcrypt.hash(userData.password, 10) : oldUser.password,
            passport: userData.passport ? userData.passport : oldUser.passport,
        },
        {new: true}
    );
};

userSchema.methods.searchUser = async (searchFilters) => {
    if (Object.keys(searchFilters).length === 0) {
        return await Users.find({});
    } else if (searchFilters._id) {
        console.log(searchFilters._id); //if searching is done by _id >>> it is unique
        return await Users.find({_id: searchFilters._id});
    } else {
        let query = [];
        if (searchFilters.firstName) {
            query.push({firstName: searchFilters.firstName});
        }
        if (searchFilters.lastName) {
            query.push({lastName: searchFilters.lastName});
        }
        if (searchFilters.email) {
            query.push({email: searchFilters.email});
        }
        if (searchFilters.passport) {
            query.push({passport: searchFilters.passport});
        }
        return await Users.find({$and: query});
    }
};

userSchema.methods.userExists = async (user) => {
    return await Users.findOne({email: user.email});
};

userSchema.methods.loginUser = async (signInInfo) => {
    const info = JSON.parse(signInInfo);
    const user = await Users.findOne({email: info.email});
    try {
        const match = await bcrypt.compare(info.password, user.password);
        const accessToken = jwt.sign(
            JSON.stringify({email: user.email, password: user.password}),
            process.env.USER_TOKEN_SECRET
        );
        if (match) {
            return {accessToken: accessToken, _id: user._id};
        } else {
            return undefined;
        }
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

userSchema.methods.verifyPassword = async (signInInfo) => {
    const info = JSON.parse(signInInfo);
    const user = await Users.findOne({_id: info._id});
    try {
        const match = await bcrypt.compare(info.password, user.password);
        if (match) {
            return {result: true,};
        } else {
            return {result: false,};
        }
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

userSchema.methods.createUser = async (requestBody) => {
    requestBody.password = await bcrypt.hash(requestBody.password, 10);
    return await Users.create(requestBody);
};

userSchema.methods.getReservedSeats = async (requestBody) => {
    return await Users.find(
        {_id: requestBody.userId},
        {
            reservations: {
                $elemMatch: {
                    flight_id: requestBody.flightId,
                    cabin: requestBody.cabin,
                },
            },
        }
    );
};

userSchema.methods.cancelReservation = async (requestBody) => {
    var arr = requestBody.seats;
    const currentUser = await Users.findById(requestBody.userId);
    var newReservations = [];
    var retres;
    for (i = 0; i < currentUser.reservations.length; i++) {
        if (
            currentUser.reservations[i].flight_id === requestBody.flightId &&
            currentUser.reservations[i].cabin === requestBody.cabin
        ) {
            var newArr = [];
            for (j = 0; j < currentUser.reservations[i].seats.length; j++)
                newArr.push(currentUser.reservations[i].seats[j]);
            for (j = 0; j < arr.length; j++) {
                const index = newArr.indexOf(arr[j]);
                if (index > -1) {
                    newArr.splice(index, 1);
                }
            }
            let newreserv = {
                flight_id: currentUser.reservations[i].flight_id,
                cabin: currentUser.reservations[i].cabin,
                seats: newArr,
            };
            let newreservmail = {
                flight_id: currentUser.reservations[i].flight_id,
                cabin: currentUser.reservations[i].cabin,
                seats: newArr,
                email: currentUser.email,
            };
            retres = newreservmail;
            if (newreserv.seats.length > 0) newReservations.push(newreserv);
        } else {
            newReservations.push(currentUser.reservations[i]);
        }
    }
    await Users.findByIdAndUpdate(requestBody.userId, {
        reservations: newReservations,
    });
    return retres;
};

userSchema.methods.reserveSeats = async (requestBody) => {
    console.log(requestBody)
    var arr = requestBody.seats;
    const currentUser = await Users.findById(requestBody.userId);
    var newReservations = [];
    var retres;
    let f = false;
    for (i = 0; i < currentUser.reservations.length; i++) {
        if (
            currentUser.reservations[i].flight_id === requestBody.flightId &&
            currentUser.reservations[i].cabin === requestBody.cabin
        ) {
            f = true;
            var newArr = [];
            for (j = 0; j < currentUser.reservations[i].seats.length; j++)
                newArr.push(currentUser.reservations[i].seats[j]);
            for (j = 0; j < arr.length; j++) newArr.push(arr[j]);
            let newreserv = {
                flight_id: currentUser.reservations[i].flight_id,
                cabin: currentUser.reservations[i].cabin,
                seats: newArr,
                price: currentUser.reservations[i].price
            };
            retres = newreserv;
            newReservations.push(newreserv);
        } else {
            newReservations.push(currentUser.reservations[i]);
        }
    }
    if (!f) {
        let newreserv = {
            flight_id: requestBody.flightId,
            cabin: requestBody.cabin,
            seats: arr,
            price: requestBody.price
        };
        retres = newreserv;
        newReservations.push(newreserv);
    }
    await Users.findByIdAndUpdate(requestBody.userId, {
        reservations: newReservations,
    });
    let newcurrentUser = await Users.findById(requestBody.userId);
    return await retres;
};

var Users = mongoose.model("Users", userSchema);

module.exports = Users;
