const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const errorMidleware = require('./middlewares/errors');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//Import all routes
const productRoute = require('./routes/product');
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');

app.use('/api/v1',productRoute);
app.use('/api/v1',authRoute);
app.use('/api/v1',orderRoute);

// Middelware to handle errors
app.use(errorMidleware);

module.exports = app;