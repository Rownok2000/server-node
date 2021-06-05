var express = require('express');
var router = express.Router();
const serverless = require ('serverless-http');

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://ahasan:Registrazione@cluster0.0pydj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

/* POST */
router.post('/', function(req, res) {
    var username = req.body.username;
    var pwd = req.body.pwd;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        var len;
        const collection = client.db("progetto").collection("users");
        collection.find({ 'username': `${username}` }).toArray((err, result) => {
            if (err) console.log(err.message);
            else {
                len = result.length;
                if(len == 1) {
                    res.send({ status: "existing_user" });
                }
            }

        if (len != 1) {
            var myobj = { username: `${username}`, password: `${pwd}` };
            collection.insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log(`Utente ${username}registrato correttamente!`);
            });

            setTimeout(function () {
                res.send({ status: "done" });
                client.close();
            }, 500);
        }
    });
});

});

module.exports = router;
//Anche usando un modulo esterno dobbiamo esportare l'oggetto serverless(router)
module.exports.handler= serverless(router);