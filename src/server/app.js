const dotenv = require('dotenv');


if(process.env.NODE_ENV == 'test') {
    console.log('CARREGOU O TESTE');
    dotenv.config({ path: './.env.test' });
}
else{
    console.log('CARREGOU O OFICIAL');
    dotenv.config({ path: './.env' });
}

console.log(process.env.DB_DATABASE)

const express = require('express');
const app = express();
const usersRoutes = require('./routes/users');
const toolsRoutes = require('./routes/tools');
const tokensRoutes = require('./routes/tokens');

app.use(express.json());
app.use(usersRoutes);
app.use(toolsRoutes);
app.use(tokensRoutes);

module.exports = app;