const express = require('express') ;
const mongoose = require('mongoose') ;
const logger = require('morgan');
const bodyParser = require("body-parser") ;


const uri = "mongodb://acl:zIwVuZCX6yZT1etC@cluster0-shard-00-00.0ipj2.mongodb.net:27017,cluster0-shard-00-01.0ipj2.mongodb.net:27017,cluster0-shard-00-02.0ipj2.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-c97c0j-shard-0&authSource=admin&retryWrites=true&w=majority";

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