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
  app.get('/', (req,res) => res.status(200).send({
    message: 'Hello World'
  }))
  // Users Routes
  app.get('/users', [ValidationMiddleware.validJWTNeeded, userController.findAll]);
  app.get('/users/:id', [ValidationMiddleware.validJWTNeeded, userController.findOne]);
  app.post('/users', [ValidationMiddleware.validJWTNeeded, VerifyUserMiddleware.isSuperUser, userController.create]);
  app.put('/users/:id', [ValidationMiddleware.validJWTNeeded, userController.update]);
  app.delete('/users/:id', [ValidationMiddleware.validJWTNeeded, userController.delete]);

  // Trips Routes
  app.get('/trips', [ValidationMiddleware.validJWTNeeded, tripController.findAll]);
  app.get('/trips/:id', [ValidationMiddleware.validJWTNeeded, tripController.findOne]);
  app.post('/trips', [ValidationMiddleware.validJWTNeeded, tripController.create]);
  app.put('/trips/:id', [ValidationMiddleware.validJWTNeeded, tripController.update]);
  app.delete('/trips/:id', [ValidationMiddleware.validJWTNeeded, tripController.delete]);

  // Flights Routes
  app.get('/flights', [ValidationMiddleware.validJWTNeeded, flightController.findAll]);
  app.get('/flights/:id', [ValidationMiddleware.validJWTNeeded, flightController.findOne]);
  app.post('/flights', [ValidationMiddleware.validJWTNeeded, flightController.create]);
  app.put('/flights/:id', [ValidationMiddleware.validJWTNeeded, flightController.update]);
  app.delete('/flights/:id', [ValidationMiddleware.validJWTNeeded, flightController.delete]);

  // Cities Routes
  app.get('/cities', [ValidationMiddleware.validJWTNeeded, cityController.findAll]);
  app.get('/cities/:id', [ValidationMiddleware.validJWTNeeded, cityController.findOne]);
  app.post('/cities', [ValidationMiddleware.validJWTNeeded, cityController.create]);
  app.put('/cities/:id', [ValidationMiddleware.validJWTNeeded, cityController.update]);
  app.delete('/cities/:id', [ValidationMiddleware.validJWTNeeded, cityController.delete]);

  // Costs Routes
  app.get('/costs', [ValidationMiddleware.validJWTNeeded, costController.findAll]);
  app.get('/costs/:id', [ValidationMiddleware.validJWTNeeded, costController.findOne]);
  app.post('/costs', [ValidationMiddleware.validJWTNeeded, costController.create]);
  app.put('/costs/:id', [ValidationMiddleware.validJWTNeeded, costController.update]);
  app.delete('/costs/:id', [ValidationMiddleware.validJWTNeeded, costController.delete]);

  // Hotels Routes
  app.get('/hotels', [ValidationMiddleware.validJWTNeeded, hotelController.findAll]);
  app.get('/hotels/:id', [ValidationMiddleware.validJWTNeeded, hotelController.findOne]);
  app.post('/hotels', [ValidationMiddleware.validJWTNeeded, hotelController.create]);
  app.put('/hotels/:id', [ValidationMiddleware.validJWTNeeded, hotelController.update]);
  app.delete('/hotels/:id', [ValidationMiddleware.validJWTNeeded, hotelController.delete]);

  // Activities Routes
  app.get('/activities', [ValidationMiddleware.validJWTNeeded, activityController.findAll]);
  app.get('/activities/:id', [ValidationMiddleware.validJWTNeeded, activityController.findOne]);
  app.post('/activities', [ValidationMiddleware.validJWTNeeded, activityController.create]);
  app.put('/activities/:id', [ValidationMiddleware.validJWTNeeded, activityController.update]);
  app.delete('/activities/:id', [ValidationMiddleware.validJWTNeeded, activityController.delete]);

  // Auth

  app.post('/auth', [
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
