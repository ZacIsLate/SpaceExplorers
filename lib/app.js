const express = require('express');
const app = express();
const errorHandler = require('./utils/error-handler');
const morgan = require('morgan');


app.use(morgan('dev'));
// ### middleware ###
app.use(express.json());
app.use(morgan('dev'));

// ### required routes ###
const auth = require('./routes/auth');
const enemy = require('./routes/enemies');
const ships = require('./routes/ships');
const environments = require('./routes/environments');
const characters = require('./routes/characters');

// ### used routes ###
app.use('/api/auth', auth);
app.use('/api/enemies', enemy);
app.use('/api/ships', ships);
app.use('/api/environments', environments);
app.use('/api/characters', characters);

// ### catchers ###
app.use(errorHandler());

module.exports = app;