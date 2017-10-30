const express = require('express');
const app = express();
const errorHandler = require('./utils/error-handler');
const morgan = require('morgan');

// ### required routes ###
const ships = require('./routes/ships');

app.use(morgan('dev'));
app.use(express.json());


// ### used routes ###
app.use('/api/ships', ships);



app.use(errorHandler());

module.exports = app;