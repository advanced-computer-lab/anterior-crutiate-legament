const express = require('express') ;
const mongoose = require('mongoose') ;
const logger = require('morgan');

const db = 'acl@cluster0.0ipj2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; 

var app = express() ;
const API = require('./routes/api');

const url = 'localhost' ;
const port = 3000 ; 

app.use(logger('dev'));
app.use(express.json());

mongoose.connect(db);

//Routers:
app.use('/api',API) ;



app.listen(port , url , ()=>{console.log(`Listening on port ${port}`)}); 
