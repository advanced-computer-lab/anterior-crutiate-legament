const express = require('express') ;
const mongoose = require('mongoose') ;
const logger = require('morgan');

const db = 'mongodb+srv://aclteam:MPPrCzCPwQJfRZDO@cluster0.0ipj2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; 

var app = express() ;
const API = require('./routes/api');
const cors = require('cors');

const url = 'localhost' ;
const port = 8000; 

app.use(cors({ origin: true, credentials: true }));
app.use(logger('dev'));
app.use(express.json());

mongoose.connect(db);

//Routers:
app.use('/api',API) ;



app.listen(port , url , ()=>{console.log(`Listening on port ${port}`)}); 
