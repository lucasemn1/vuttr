const express = require('express');
const routes = express.Router();
const ToolController = require('../../app/controllers/ToolController');

//Tool
routes.post('/tool', ToolController.store);
routes.get('/tools', ToolController.index);

module.exports = routes;