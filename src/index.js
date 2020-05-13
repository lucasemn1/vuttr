const dotenv = require('dotenv');
dotenv.config('../');

const express = require('express')
const app = express()
const routes = require('./routes');

app.use(routes)
app.use(express.json())

app.listen(process.env.PORT, process.env.HOST)