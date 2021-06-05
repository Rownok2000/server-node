const express = require('express');
const serverless = require ('serverless-http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const app = express();
const router = express.Router();

var usersRouter = require('./routes/index');


 //E' necessario usare per tutte le route il prefisso /.netlify/functions
 app.use('/.netlify/functions/api/index', usersRouter);

module.exports = app;
module.exports.handler= serverless(app);  //Qui è dove esportiamo le nostre funzioni per netlify