const express = require('express');
const routes = express.Router();

//Controllers
const UserController = require('../app/controllers/UserController')

//User
routes.post('/user', UserController.store)

module.exports = routes