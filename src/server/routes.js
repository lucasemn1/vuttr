const express = require('express');
const routes = express.Router();

//Controllers
const UserController = require('../app/controllers/UserController');
const ToolController = require('../app/controllers/ToolController');

//User
routes.post('/user', UserController.store);
routes.get('/user/:id', UserController.show);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

//Tool
routes.post('/tool', ToolController.store);
routes.get('/tools', ToolController.index);

module.exports = routes;