const express = require('express');
const routes = express.Router();
const ToolController = require('../../app/controllers/ToolController');
const authMiddleware = require('../../app/middlewares/auth');
const userHasToolMiddleware = require('../../app/middlewares/userHasTool');

//Tool
routes.post('/tool', authMiddleware, ToolController.store);
routes.get('/tools', authMiddleware, ToolController.index);
routes.delete('/tools/:id', authMiddleware, userHasToolMiddleware, ToolController.destroy);

module.exports = routes;