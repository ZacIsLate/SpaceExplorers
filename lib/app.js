const express = require('express');
const app = express();
const errorHandler = require('./utils/error-handler');
const morgan = require('morgan');

// ### middleware ###
app.use(express.json());
app.use(morgan('dev'));

// ### required routes ###
const auth = require('./routes/auth');
const enemy = require('./route/enemies');
const ships = require('./routes/ships');

// ### used routes ###
app.use('/api/auth', auth);
app.use('/api/enemies', enemy);
app.use('/api/ships', ships);

// ### catchers ###
app.use(errorHandler());

module.exports = app;