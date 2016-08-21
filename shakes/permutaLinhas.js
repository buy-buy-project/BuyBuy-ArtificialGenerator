//Program 1 Exchange lines of shopping

//Value between 0-1 that indicate the percentage of lines will gone random 
var PERCENTAGE_SHAKE = 0.10;
var express = require('express')
  , load = require('express-load')
  , app  = express()
  , PORT = 4001
  , mongo = require('mongodb').MongoClient
  , changedObject;


function shake(array, percentageShake) {
    var shakeSize = parseInt(array.length * percentageShake) 
     , temporaryValue
     , firstRandomIndex
     , secRandomIndex;

    while (0 !== shakeSize) {
        firstRandomIndex = Math.floor(Math.random() * array.length);
        secRandomIndex = Math.floor(Math.random() * array.length);
        shakeSize--;

        temporaryValue = array[firstRandomIndex];
        array[firstRandomIndex] = array[secRandomIndex];
        array[secRandomIndex] = temporaryValue;
    }

    return array;
}


mongo.connect('mongodb://localhost:27017/buybuy', function(err, db) {
    if(err) throw err;

    console.log("Connected correctly to Mongo");

    db.collection("shopping").find({}).toArray(function(err, docs){
        changedObject = shake(docs, PERCENTAGE_SHAKE);

        db.collection("shopping_linesChanged_"+PERCENTAGE_SHAKE).insert(changedObject, function(err, result){
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
