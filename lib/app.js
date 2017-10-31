const express = require('express');
const app = express();
const errorHandler = require('./utils/error-handler');
const morgan = require('morgan');

app.use(morgan('dev'));
// ### middleware ###
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('./public'));

// ### required routes ###
const auth = require('./routes/auth');
const enemy = require('./routes/enemies');
const ships = require('./routes/ships');
const spaceEnvs = require('./routes/spaceEnvs');
const characters = require('./routes/characters');
const events = require('./routes/events');

// ### used routes ###
app.use('/api/auth', auth);
app.use('/api/enemies', enemy);
app.use('/api/ships', ships);
app.use('/api/spaceEnvs',spaceEnvs);
app.use('/api/characters', characters);
app.use('/api/events', events);

// ### catchers ###
app.use(errorHandler());

module.exports = app;