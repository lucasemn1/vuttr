const express = require('express');
const routes = express.Router();

//Controllers
const JWTController = require('../../app/controllers/JWTController');

//JWT
routes.post('/token', JWTController.store);
routes.get('/token', JWTController.showUser);

module.exports = routes;