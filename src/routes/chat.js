var express = require('express');
var router = express.Router();
const serverless = require ('serverless-http');

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://ahasan:Registrazione@cluster0.0pydj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

router.get('/get/:group', function(req, res) {
    var group = req.params.group;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        if (err) {
            res.send({response:err});
        } else {
            const collection = client.db("progetto").collection("groups");
            collection.find({"name": `${group}`}).toArray((err, result) => {
                res.send(result);
            });
        }
    });
});

router.get('/addMessage/:group/:message', function(req, res) {
    var group = req.params.group;
    var message = req.params.message;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        if (err) {
            res.send({response:err});
        } else {
        const collection = client.db("progetto").collection("groups");
        collection.findOneAndUpdate({ 'name': `${group}`},  {$push: { 'chat': `${message}` }});
        res.send({response:"ok"});
        }
    });
});

module.exports = router;
//Anche usando un modulo esterno dobbiamo esportare l'oggetto serverless(router)
module.exports.handler= serverless(router);