var express = require('express');
var router = express.Router();
const serverless = require ('serverless-http');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
      user:"pinco pallino"
  });
});

module.exports = router;
//Anche usando un modulo esterno dobbiamo esportare l'oggetto serverless(router)
module.exports.handler= serverless(router); 