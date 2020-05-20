const express = require('express');
const routes = express.Router();
const UserController = require('../../app/controllers/UserController');
const authMiddleware = require('../../app/middlewares/auth');

//User
routes.post('/user', UserController.store);
routes.get('/user', authMiddleware, UserController.show);
routes.put('/user', authMiddleware, UserController.update);
routes.delete('/user', authMiddleware, UserController.delete);

module.exports = routes;