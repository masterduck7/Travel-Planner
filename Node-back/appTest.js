var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors')
global.crypto = require('crypto')
var app = express();

// view engine setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())

// Models
var models = require('./models');

// DB
models.sequelize.sync()

// Routes
require('./routes')(app);

module.exports = app;