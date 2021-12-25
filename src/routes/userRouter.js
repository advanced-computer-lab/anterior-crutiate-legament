const express = require("express");
var userRouter = express.Router();

const Flights = new require("../models/Flights.js")();
const Users = new require("../models/User.js")();
const jwt = require("jsonwebtoken");
const reserPassword = require ( "./mails/ResetPassword")  ; 

require("dotenv").config();

var nodemailer = require("nodemailer");

function verifyUserToken(jwtToken) {
    console.log(jwtToken);
    if(!jwtToken) return true;
    jwt.verify(jwtToken, process.env.USER_TOKEN_SECRET, async (err, verifiedJwt) => {
      return err;
    });
}



// payment
userRouter
.route("/payment")
.post(function (req, res) {
  console.log(req.body);
  const stripe = require("stripe")(
    "sk_test_51K9e8iLXRXUubuQwrppL5IzFaYedXstfDSK8jBOJ9Te0LHCtT8PrN6KNxt3RJR0qAunoRg0VRyik2BowDxcXuv8C00tswPewv1"
  );
  const { amount, email, token } = req.body;

  stripe.customers
    .create({
      email: email,
      source: token.id,
      name: token.card.name,
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: parseFloat(amount) * 100,
        description: `Payment for USD ${amount}`,
        currency: "USD",
        customer: customer.id,
      });
    })
    .then((charge) => res.status(200).send(charge))
    .catch((err) => console.log(err));
})

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
    let verificationError = verifyUserToken(req.body.token);
    if (verificationError) {
      res.statusCode = 401;
      res.end("Unauthorized");
    } else {
        delete req.body.token;
        await Users.updateUser(req.body)  ;
        res.end("User Details Updated");
    }
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

//get the user information
userRouter
  .route("/getUserDetails")
  .get(async (req, res, next) => {
    let verificationError = verifyUserToken(req.query.in ? JSON.parse(req.query.in).token : null);
    if (verificationError) {
      res.statusCode = 401;
      res.end("Unauthorized");
    } else {
        req.query.in = JSON.parse(req.query.in);
        delete req.query.in.token;
        let results = await Users.searchUser(req.query.in);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(results));
    }
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

//check if the user with this email 
userRouter
  .route("/userExists")
  .get(async (req, res, next) => {
    let user = await Users.userExists(JSON.parse(req.query.email));
    console.log(user) ;
    if(!user)
        res.statusCode = 406 ;
    res.end();
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

//user login
userRouter.route("/userLogin")
  .get(async (req, res, next) => {
   
    let results = await Users.loginUser(
      JSON.parse(JSON.stringify(req.query.signInfo))
    );

    if (!results) 
        res.statusCode = 203;
    
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(results));
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

//user login
userRouter
  .route("/verifyPassword")
  .get(async (req, res, next) => {
   
    let verificationError = verifyUserToken(req.query.in ? JSON.parse(req.query.in).token : null);
    if (verificationError) {
      res.statusCode = 401;
      res.end("Unauthorized");
    } else {
        req.query.in = JSON.parse(req.query.in);
        //console.log(req.query.in);
        delete req.query.in.token;
        console.log(req.query.in);
        let results = await Users.verifyPassword(req.query.in);
        if (!results) res.statusCode = 203;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(results));
    }
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

userRouter
  .route("/cancelReservation")
  .delete(async (req, res, next) => {
    let verificationError = verifyUserToken(req.body.token);
    if (verificationError) {
      res.statusCode = 401;
      res.end("Unauthorized");
    } else {
        delete req.body.token;
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
        sendEmail(result.email ,"GUC Air Reservation Status", "Your Reservation is canceled successfuly");
        res.send("Reservation cancelled successfully");
        } else {
        res.send("There's no such reservation");
        }
    }
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

userRouter
  .route("/reserveSeats")
  .put(async (req, res, next) => {
    let verificationError = verifyUserToken(req.body.token);
    if (verificationError) {
      res.statusCode = 401;
      res.end("Unauthorized");
    } else {
        delete req.body.token;
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


userRouter.route("/sendVerificationCode")
  .post(async (req, res, next) => {
      let user = await Users.userExists(req.body.email);
      if(user){

        let randomCode = Math.floor((Math.random() * 899999) + 100000);
        
        const r = await Users.updateUser({_id:user._id , verificationCode:randomCode});
        sendEmail(req.body.email ,"Reset Your Password", reserPassword(randomCode)) ;
      }
      else {
        res.statusCode = 406;
      }
      res.end();
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });

  userRouter.route("/verifyCode")
  .post(async (req, res, next) => {
      console.log(req.body) ;
      let token = await Users.verifyCode(req.body);
      if(!token) {
        res.statusCode = 401 ;
      }
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(token));
  })
  .all((req, res, next) => {
    res.statusCode = 403;
    res.end("operation not supported");
  });



function sendEmail(toEmail ,subject, mailBody) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.NO_REPLY_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    }
  });
  const mailOptions = {
    from:{
      name: "GUC AIR",
      address: process.env.NO_REPLY_EMAIL
    },
    to: toEmail,
    subject: subject,
    html: `${mailBody}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) console.log(error);
    else console.log("Email Sent");
  });
}


function confirmMail(props) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "aclteam4@gmail.com",
            pass: "Acl@2468",
        },
    });
    const mailOptions = {
        from: "aclteam4@gmail.com",
        to: props.email,
        subject: "Confirmation",
        text: `Hi ${props.name}! \n \n Your message has been succefully sent to us. \n\n Thanks.`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) console.log(error);
        else console.log("Email Sent");
    });
}

function contactUs(props) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "aclteam4@gmail.com",
            pass: "Acl@2468",
        },
    });
    const mailOptions = {
        from: props.email,
        to: "aclteam4@gmail.com",
        subject: props.subject,
        text: `Hi \n \n I am ${props.name}, \n \n ${props.userMessage} \n \n Best Regards, \n ${props.name}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) console.log(error);
        else console.log("Email Sent");
    });
}

module.exports = userRouter;
