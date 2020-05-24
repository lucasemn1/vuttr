const app = require('./app');

app.listen(process.env.PORT || 3000);

if(process.env.NODE_ENV === 'development') {
    app.listen('localhost');
}

app.listen()