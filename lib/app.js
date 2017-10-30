const express = require('express');
const app = express();
const errorHandler = require('./utils/error-handler');
const morgan = require('morgan');

// ### required routes ###
const ships = require('./routes/ships');
const characters = require('./routes/characters');

app.use(morgan('dev'));
app.use(express.json());

const auth = require('./routes/auth');
app.use('/api/auth', auth);

// ### used routes ###
app.use('/api/ships', ships);
app.use('/api/characters', characters);



app.use(errorHandler());

module.exports = app;