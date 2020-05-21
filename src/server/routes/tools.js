const express = require('express');
const routes = express.Router();
const ToolController = require('../../app/controllers/ToolController');
const authMiddleware = require('../../app/middlewares/auth');

//Tool
routes.post('/tool', authMiddleware, ToolController.store);
routes.get('/tools', authMiddleware, ToolController.index);

module.exports = routes;