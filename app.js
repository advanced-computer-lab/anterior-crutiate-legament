const express = require('express') ;
const mongoose = require('mongoose') ;
const logger = require('morgan');

const db = 'mongodb://localhost:27017/ACL_test'; 

var app = express() ;
const API = require('./routes/API');

const url = 'localhost' ;
const port = 3000 ; 

app.use(logger('dev'));
app.use(express.json());

mongoose.connect(db);

//Routers:
app.use('/api',API) ;



app.listen(port , url , ()=>{console.log(`Listening on port ${port}`)}); 