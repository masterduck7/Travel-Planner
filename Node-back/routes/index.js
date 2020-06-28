var express = require('express');
var router = express.Router();

// Controllers
var userController = require('../controllers/user');
var tripController = require('../controllers/trip');
var flightController = require('../controllers/flight');
var cityController = require('../controllers/city');
var costController = require('../controllers/cost');
var hotelController = require('../controllers/hotel');
var activityController = require('../controllers/activity');

module.exports = (app) => {
  app.get('/api', (req,res) => res.status(200).send({
    message: 'Hello World'
  }))
  // Users Routes
  app.get('/api/users', userController.findAll);
  app.get('/api/users/:id', userController.findOne);
  app.post('/api/users', userController.create);
  app.put('/api/users/:id', userController.update);
  app.delete('/api/users/:id', userController.delete);

  // Trips Routes
  app.get('/api/trips', tripController.findAll);
  app.get('/api/trips/:id', tripController.findOne);
  app.post('/api/trips', tripController.create);
  app.put('/api/trips/:id', tripController.update);
  app.delete('/api/trips/:id', tripController.delete);

  // Flights Routes
  app.get('/api/flights', flightController.findAll);
  app.get('/api/flights/:id', flightController.findOne);
  app.post('/api/flights', flightController.create);
  app.put('/api/flights/:id', flightController.update);
  app.delete('/api/flights/:id', flightController.delete);

  // Cities Routes
  app.get('/api/cities', cityController.findAll);
  app.get('/api/cities/:id', cityController.findOne);
  app.post('/api/cities', cityController.create);
  app.put('/api/cities/:id', cityController.update);
  app.delete('/api/cities/:id', cityController.delete);

  // Costs Routes
  app.get('/api/costs', costController.findAll);
  app.get('/api/costs/:id', costController.findOne);
  app.post('/api/costs', costController.create);
  app.put('/api/costs/:id', costController.update);
  app.delete('/api/costs/:id', costController.delete);

  // Hotels Routes
  app.get('/api/hotels', hotelController.findAll);
  app.get('/api/hotels/:id', hotelController.findOne);
  app.post('/api/hotels', hotelController.create);
  app.put('/api/hotels/:id', hotelController.update);
  app.delete('/api/hotels/:id', hotelController.delete);

  // Activities Routes
  app.get('/api/activities', activityController.findAll);
  app.get('/api/activities/:id', activityController.findOne);
  app.post('/api/activities', activityController.create);
  app.put('/api/activities/:id', activityController.update);
  app.delete('/api/activities/:id', activityController.delete);
}
