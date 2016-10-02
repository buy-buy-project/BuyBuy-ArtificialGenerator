//Program 2 Exchange quantity of shopping

//Value between 0-1 that indicate the percentage of quantities will gone random 
var PERCENTAGE_SHAKE = 0.90;
var express = require('express')
  , load = require('express-load')
  , app  = express()
  , PORT = 4002
  , mongo = require('mongodb').MongoClient
  , changedObject;


function shake(array, percentageShake) {
    var shakeSize = parseInt(array.length * percentageShake) 
     , temporaryValue
     , firstRandomIndex
     , secRandomIndex
     , newRandomQuantity;

    while (0 !== shakeSize) {
        randomIndex = Math.floor(Math.random() * array.length);
        shakeSize--;

        newRandomQuantity =  Math.floor((Math.random() * 10) + 1);
        array[randomIndex].quantity = newRandomQuantity;
    }

    return array;
}


mongo.connect('mongodb://localhost:27017/buybuy', function(err, db) {
    if(err) throw err;

    console.log("Connected correctly to Mongo");

    db.collection("shopping").find({}).toArray(function(err, docs){
        changedObject = shake(docs, PERCENTAGE_SHAKE);

        db.collection("shopping_quantsChanged_"+PERCENTAGE_SHAKE).insert(changedObject, function(err, result){
            if(err) throw err;
        });

        app.get("/", function(req, res){
            res.json(changedObject)
        });        
    });

    app.listen(PORT, function (){
      console.log("Running Server on " + PORT);
    });
});
