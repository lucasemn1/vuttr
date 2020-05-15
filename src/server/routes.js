const express = require('express');
const routes = express.Router();

//Controllers
const UserController = require('../app/controllers/UserController')
const ToolController = require('../app/controllers/ToolController')

//User
routes.post('/user', UserController.store)

//Tool
routes.post('/tool', ToolController.store)
routes.get('/tools', ToolController.index)

module.exports = routes