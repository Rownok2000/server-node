var express = require('express');
var router = express.Router();
const serverless = require ('serverless-http');

const MongoClient = require('mongodb').MongoClient;


router.post('/', function (req, res) {
    var username = req.body.username;
    var pwd = req.body.password;
    console.log(req.body);

    console.log(pwd);

    const uri = 'mongodb+srv://ahasan:Registrazione@cluster0.0pydj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("progetto").collection("users");
        collection.find({$and:[{"username": `${username}`},{"password":`${pwd}`}]}).toArray((err, result) => {
            
            if (err) 
            {
                console.log(err.message); //Se c'è qualche errore lo stampo
            }
            else 
            {
                console.log(result);
                if(result.length == 1)
                {
                res.send({'result': result, logged:true});
               
                }
                else if (result.length != 1)
                {
                    res.send({'result': result, logged:false});
                }
            }
            client.close(); //Quando ho terminato la find chiudo la sessione con il db
        }); //Eseguo la query e passo una funzione di callback

    });
});


module.exports = router;
//Anche usando un modulo esterno dobbiamo esportare l'oggetto serverless(router)
module.exports.handler= serverless(router);