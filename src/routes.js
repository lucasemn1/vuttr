const express = require('express');
const routes = express.Router();

//Controllers
const UserController = require('./app/controllers/UserController')

//User
routes.get('/', UserController.store)

module.exports = routes