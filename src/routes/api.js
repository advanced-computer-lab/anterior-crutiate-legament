const express = require('express') ;
var apiRouter = express.Router () ;
var adminRouter = require('./adminRouter');




apiRouter.use('/admin',adminRouter);



module.exports = apiRouter ;

