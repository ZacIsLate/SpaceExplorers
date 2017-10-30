const express = require('express');
const app = express();
const errorHandler = require('./utils/error-handler');
const morgan = require('morgan');

const enemy = require('./route/enemies');

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/enemies', enemy);


app.use(errorHandler());

module.exports = app;