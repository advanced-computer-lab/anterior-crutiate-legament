const express = require('express') ;
var apiRouter = express.Router () ;
var adminRouter = require('./adminRouter');




apiRouter.use('/adminRouter',adminRouter);



module.exports = apiRouter ;

