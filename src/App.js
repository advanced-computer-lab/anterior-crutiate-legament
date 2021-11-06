const express = require('express') ;
const mongoose = require('mongoose') ;
require('dotenv').config()
const logger = require('morgan');
const bodyParser = require("body-parser") ;

const uri = "mongodb+srv://acl:acl@cluster0.0ipj2.mongodb.net/AirflightsSystem?retryWrites=true&w=majority";

var app = express() ;
const API = require('./routes/api');
const cors = require('cors');

const url = 'localhost' ;
const port = 8000; 

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(logger('dev'));


mongoose.connect(uri);

//Routers:
app.use('/api',API) ;



app.listen(port , url , ()=>{console.log(`Listening on port ${port}`)}); 