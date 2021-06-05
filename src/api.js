const express = require('express');
const serverless = require ('serverless-http');
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');


const app = express();
const router = express.Router();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(new cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

 //E' necessario usare per tutte le route il prefisso /.netlify/functions
 app.use('/.netlify/functions/api/users', usersRouter);
 app.use('/.netlify/functions/api/indes', indexRouter);

 //NB!
 //NON è necessario avviare il server perchè stiamo creando una lambda function
 /*
 app.listen(port, () => {//NON FACCIO NULlA })
*/

module.exports = app;
module.exports.handler= serverless(app);  //Qui è dove esportiamo le nostre funzioni per netlify