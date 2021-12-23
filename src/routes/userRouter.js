const express = require("express");
var userRouter = express.Router();

const Flights = new require("../models/Flights.js")();
const Users = new require("../models/User.js")();

const jwt = require("jsonwebtoken");
require("dotenv").config();
var nodemailer = require("nodemailer");

// user search flights
userRouter
  .route("/searchFlights")
  .get(async (req, res, next) => {
    const searchFilters = JSON.parse(req.query.searchFilters);
    var results = [];
    if (
      (searchFilters.from &&
        searchFilters.to &&
        searchFilters.departure_time &&
        searchFilters.flight_class &&
        searchFilters.adults &&
        searchFilters.childs) ||
      searchFilters._id
    ) {
      results = await Flights.searchFlights(searchFilters);
    }
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(results));
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

// update user information

userRouter
  .route("/editUserData")
  .put(async (req, res, next) => {
    await Users.updateUser(JSON.parse(JSON.stringify(req.body)));
    res.end("User Details Updated");
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

//get the user information
userRouter
  .route("/getUserDetails")
  .get(async (req, res, next) => {
    let results = await Users.searchUser(JSON.parse(req.query.in));
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(results));
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

// register a user
userRouter
  .route("/userRegister")
  .post(async (req, res, next) => {
    await Users.createUser(JSON.parse(JSON.stringify(req.body)));
    res.end("user register");
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

//check if the user with this email or passport number exist
userRouter
  .route("/userExists")
  .get(async (req, res, next) => {
    let user = await Users.userExists(JSON.parse(req.query.user));
    res.end(JSON.stringify(user ? true : false));
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

//user login
userRouter
  .route("/userLogin")
  .get(async (req, res, next) => {
    let results = await Users.loginUser(
      JSON.parse(JSON.stringify(req.query.signInfo))
    );
    if (!results) res.statusCode = 203;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(results));
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

userRouter
  .route("/cancelReservation")
  .delete(async (req, res, next) => {
    console.log(req.body);
    var result = await Users.cancelReservation(req.body);
    let requestBody = { _id: result.flight_id, seats: req.body.seats };
    if (req.body.cabin === "First") {
      requestBody.firstCabin = true;
    } else if (req.body.cabin === "Business") {
      requestBody.businessCabin = true;
    } else {
      requestBody.economyCabin = true;
    }
    console.log(requestBody);
    Flights.unreserveSeats(requestBody);
    if (result) {
      sendEmail(result.email);
      res.send("Reservation cancelled successfully");
    } else {
      res.send("There's no such reservation");
    }
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

userRouter
  .route("/reserveSeats")
  .put(async (req, res, next) => {
    var result = await Users.reserveSeats(req.body);
    let requestBody = { _id: result.flight_id, seats: result.seats };
    if (req.body.cabin === "First") {
      requestBody.firstCabin = true;
    } else if (req.body.cabin === "Business") {
      requestBody.businessCabin = true;
    } else {
      requestBody.economyCabin = true;
    }
    Flights.reserveSeats(requestBody);
    if (result) {
      res.send("Reservation done successfully");
    } else {
      res.send("Error in reservation");
    }
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

//get Flight info using it's id
userRouter
  .route("/flightData")
  .get(async (req, res, next) => {
    let results = await Flights.searchFlights(
      JSON.parse(req.query.searchFilters)
    );
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(results));
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

userRouter
  .route("/getFlightDetails")
  .get(async (req, res, next) => {
    let results = await Flights.searchFlights(
      JSON.parse(req.query.searchFilters)
    );
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(results));
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

function sendEmail(toEmail) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aclteam4@gmail.com",
      pass: "Acl@2468",
    },
  });
  const mailOptions = {
    from: toEmail,
    to: toEmail,
    subject: "GUC Air Reservation Status",
    text: "Your Reservation is canceled successfuly",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) console.log(error);
    else console.log("Email Sent");
  });
}

module.exports = userRouter;
