var express = require('express');
var router = express.Router();
const serverless = require ('serverless-http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
//Anche usando un modulo esterno dobbiamo esportare l'oggetto serverless(router)
module.exports.handler= serverless(router); 