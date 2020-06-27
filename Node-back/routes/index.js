var express = require('express');
var router = express.Router();

var userController = require('../controllers').User;
module.exports = (app) => {
  app.get('/api', (req,res) => res.status(200).send({
    message: 'Hello World'
  }))
  app.get('/api/users', userController.findAll);
  app.get('/api/users/:id', userController.findOne);
  app.post('/api/users', userController.create);
  app.put('/api/users/:id', userController.update);
  app.delete('/api/users/:id', userController.delete);
}
