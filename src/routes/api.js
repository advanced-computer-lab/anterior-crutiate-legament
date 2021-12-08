const express = require('express') ;
var apiRouter = express.Router () ;
var adminRouter = require('./adminRouter');
var userRouter = require('./userRouter');




apiRouter.use('/admin',adminRouter);
apiRouter.use('/user',userRouter);



module.exports = apiRouter ;