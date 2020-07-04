var http = require('http');
const https = require('https');
const fs = require('fs');
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
global.crypto = require('crypto')

var app = express();

// view engine setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Models
var models = require('./models');

// DB

models.sequelize.sync().then(function(){
  console.log('DB OK')
}).catch(function(error){
  console.log(err, 'Error found')
})

//Certificate

const options = {
  key: fs.readFileSync('./certificates/travelPlanner_key.pem'),
  cert: fs.readFileSync('./certificates/travelPlanner_Certificate.pem')
};


// Routes

require('./routes')(app);
http.createServer(app).listen(3000, () => { console.log('Server started listening on port ' + 3000); });
https.createServer(options, app).listen(8000);

module.exports = app;
