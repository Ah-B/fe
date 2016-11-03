const express = require('express'),
interfaceRouter = require('./interfaceRouter'),
bookModel = require('../models/bookModel'),
bookRouter = require('./bookRouter')(bookModel);



let mainRouter = express.Router();

module.exports = (app) => {
app.use('/',interfaceRouter);
app.use('/api/book',bookRouter);
};
