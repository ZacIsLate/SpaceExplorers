const express = require('express');
const app = express();
const errorHandler = require('./utils/error-handler');
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(express.json());

const auth = require('./routes/auth');
app.use('/api/auth', auth);

app.use(errorHandler());

module.exports = app;