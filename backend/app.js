const express = require('express');
const app = express();

const errorMidleware = require('./middlewares/errors');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Import all routes
const productRoute = require('./routes/product');

app.use('/api/v1',productRoute);

// Middelware to handle errors
app.use(errorMidleware);

module.exports = app;