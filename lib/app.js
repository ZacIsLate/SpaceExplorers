const express = require('express');
const app = express();
const errorHandler = require('./utils/error-handler');
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(express.json());


app.use(errorHandler());

module.exports = app;