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
// Auth
var VerifyUserMiddleware = require('../auth/middlewares/verify.user.middleware')
var AuthorizationController = require('../auth/controllers/authorization.controller')
var ValidationMiddleware = require('../auth/validation/auth.validation.middleware')

module.exports = (app) => {
  app.get('/api', (req,res) => res.status(200).send({
    message: 'Hello World'
  }))
  // Users Routes
  app.get('/api/users', [ValidationMiddleware.validJWTNeeded, userController.findAll]);
  app.get('/api/users/:id', [ValidationMiddleware.validJWTNeeded, userController.findOne]);
  app.post('/api/users', userController.create);
  app.put('/api/users/:id', [ValidationMiddleware.validJWTNeeded, userController.update]);
  app.delete('/api/users/:id', [ValidationMiddleware.validJWTNeeded, userController.delete]);

  // Trips Routes
  app.get('/api/trips', [ValidationMiddleware.validJWTNeeded, tripController.findAll]);
  app.get('/api/trips/:id', [ValidationMiddleware.validJWTNeeded, tripController.findOne]);
  app.post('/api/trips', [ValidationMiddleware.validJWTNeeded, tripController.create]);
  app.put('/api/trips/:id', [ValidationMiddleware.validJWTNeeded, tripController.update]);
  app.delete('/api/trips/:id', [ValidationMiddleware.validJWTNeeded, tripController.delete]);

  // Flights Routes
  app.get('/api/flights', [ValidationMiddleware.validJWTNeeded, flightController.findAll]);
  app.get('/api/flights/:id', [ValidationMiddleware.validJWTNeeded, flightController.findOne]);
  app.post('/api/flights', [ValidationMiddleware.validJWTNeeded, flightController.create]);
  app.put('/api/flights/:id', [ValidationMiddleware.validJWTNeeded, flightController.update]);
  app.delete('/api/flights/:id', [ValidationMiddleware.validJWTNeeded, flightController.delete]);

  // Cities Routes
  app.get('/api/cities', [ValidationMiddleware.validJWTNeeded, cityController.findAll]);
  app.get('/api/cities/:id', [ValidationMiddleware.validJWTNeeded, cityController.findOne]);
  app.post('/api/cities', [ValidationMiddleware.validJWTNeeded, cityController.create]);
  app.put('/api/cities/:id', [ValidationMiddleware.validJWTNeeded, cityController.update]);
  app.delete('/api/cities/:id', [ValidationMiddleware.validJWTNeeded, cityController.delete]);

  // Costs Routes
  app.get('/api/costs', [ValidationMiddleware.validJWTNeeded, costController.findAll]);
  app.get('/api/costs/:id', [ValidationMiddleware.validJWTNeeded, costController.findOne]);
  app.post('/api/costs', [ValidationMiddleware.validJWTNeeded, costController.create]);
  app.put('/api/costs/:id', [ValidationMiddleware.validJWTNeeded, costController.update]);
  app.delete('/api/costs/:id', [ValidationMiddleware.validJWTNeeded, costController.delete]);

  // Hotels Routes
  app.get('/api/hotels', [ValidationMiddleware.validJWTNeeded, hotelController.findAll]);
  app.get('/api/hotels/:id', [ValidationMiddleware.validJWTNeeded, hotelController.findOne]);
  app.post('/api/hotels', [ValidationMiddleware.validJWTNeeded, hotelController.create]);
  app.put('/api/hotels/:id', [ValidationMiddleware.validJWTNeeded, hotelController.update]);
  app.delete('/api/hotels/:id', [ValidationMiddleware.validJWTNeeded, hotelController.delete]);

  // Activities Routes
  app.get('/api/activities', [ValidationMiddleware.validJWTNeeded, activityController.findAll]);
  app.get('/api/activities/:id', [ValidationMiddleware.validJWTNeeded, activityController.findOne]);
  app.post('/api/activities', [ValidationMiddleware.validJWTNeeded, activityController.create]);
  app.put('/api/activities/:id', [ValidationMiddleware.validJWTNeeded, activityController.update]);
  app.delete('/api/activities/:id', [ValidationMiddleware.validJWTNeeded, activityController.delete]);

  // Auth

  app.post('/api/auth', [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthorizationController.login
  ]);

  app.post('/auth/refresh', [
    ValidationMiddleware.validJWTNeeded,
    ValidationMiddleware.verifyRefreshBodyField,
    ValidationMiddleware.validRefreshNeeded,
    AuthorizationController.login
]);
}
