const express = require('express'),
interfaceRouter = require('./interfaceRouter');
let mainRouter = express.Router();

module.exports = (app) => {
app.use('/',interfaceRouter);
};
