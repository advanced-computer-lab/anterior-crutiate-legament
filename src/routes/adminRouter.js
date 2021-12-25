const express = require("express");
var adminRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Flights = new require("../models/Flights.js")();
const Admin = new require("../models/Admin.js")();

function verifyAdminToken(jwtToken) {
  if(!jwtToken) return true;
  jwt.verify(jwtToken, process.env.ADMIN_TOKEN_SECRET, async (err, verifiedJwt) => {
    return err;
  });
}

// delete Flight record by its mongoDB id
adminRouter
  .route("/adminDeleteFlight")
  .delete(async (req, res, next) => {
    let verificationError = verifyAdminToken(req.body.token);
    if (verificationError) {
      res.statusCode = 401;
      res.end("Unauthorized");
    } else {
      var result = await Flights.deleteFlight(req.body._id);
      if (result) {
        res.send("Flight deleted successfully");
      } else {
        res.send("There's no such flight");
      }
    }
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

// update flight information

adminRouter
  .route("/adminUpdateFlight")
  .put(async (req, res, next) => {
    let verificationError = verifyAdminToken(req.body.token);
    if (verificationError) {
      res.statusCode = 401;
      res.end("Unauthorized");
    } else {
      delete req.body.token;
      await Flights.updateFlight(req.body);
      res.end("Flight Updated");
    }
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

//get all flights in the database, if there is no filter (empty body) ... to be modified later if the database got big to return a query results with reasonable number.
//get the all flights having some search filters
adminRouter
  .route("/adminSearchFlights")
  .get(async (req, res, next) => {
    let verificationError = verifyAdminToken(req.query.searchFilters ? JSON.parse(req.query.searchFilters).token : null);
    if (verificationError) {
      res.statusCode = 401;
      res.end("Unauthorized");
    } else {
      let searchTerms = JSON.parse(req.query.searchFilters);
      delete searchTerms.token;
      let results = await Flights.searchFlights(searchTerms);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(results));
    }
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

//create a flight with flight_number, from, to, departure_time, arrival_time, capin. if error occured, it is returned in the response.
adminRouter
  .route("/adminCreateFlight")
  .post(async (req, res, next) => {
    let verificationError = verifyAdminToken(req.body.token);
    if (verificationError) {
      res.statusCode = 401;
      res.end("Unauthorized");
    } else {
      delete req.body.token;
      await Flights.createFlight(req.body);
      res.end("flight created");
    }
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

// admin login
adminRouter
  .route("/adminLogin")
  .get(async (req, res, next) => {
    let results = await Admin.loginAdmin(JSON.parse(req.query.loginDetails));
    res.setHeader("Content-Type", "application/json");
    if(!results) {
      res.statusCode = 401;
      res.end("wrong username or password");
    }
    res.end(JSON.stringify(results));
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

adminRouter
  .route("/addAdmin")
  .post(async (req, res, next) => {
    let verificationError = verifyAdminToken(req.body.token);
    if (verificationError) {
      res.statusCode = 401;
      res.end("Unauthorized");
    } else {
      let result = await Admin.createAdmin(req.body);
      if(!result) {
        res.statusCode = 401;
        res.end("Admin Already Exists");
      } else {
        res.end("New Admin Added");
      }
    }
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

module.exports = adminRouter;
