const express = require('express');
const serverless = require ('serverless-http');

const app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require('body-parser')
const cors = require('cors')

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var gruppoRouter = require('./routes/gruppo');
var chatRouter = require('./routes/chat');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(new cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/.netlify/functions/api/index', indexRouter);
app.use('/.netlify/functions/api/register', registerRouter);
app.use('/.netlify/functions/api/login', loginRouter);
app.use('/.netlify/functions/api/gruppo', gruppoRouter);
app.use('/.netlify/functions/api/chat', chatRouter);

module.exports = app;
module.exports.handler= serverless(app);  //Qui è dove esportiamo le nostre funzioni per netlify