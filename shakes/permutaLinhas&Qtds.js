//Program 3 Exchange quantity AND lines of shopping

//Value between 0-1 that indicate the percentage of shoppings quantity will gone random 
var PERCENTAGE_QTDS_SHAKE = 0.90;
//Value between 0-1 that indicate the percentage of lines will gone random 
var PERCENTAGE_LINES_SHAKE = 0.90;

var express = require('express')
  , load = require('express-load')
  , app  = express()
  , PORT = 4003
  , mongo = require('mongodb').MongoClient
  , changedObject;


function shake(array, percentageQtdShake, percentageLineShake) {
    var qtdShakeSize = parseInt(array.length * percentageQtdShake) 
     , lineShakeSize = parseInt(array.length * percentageLineShake) 
     , temporaryValue
     , firstRandomIndex
     , secRandomIndex
     , newRandomQuantity;

    while (0 !== qtdShakeSize) {
        firstRandomIndex = Math.floor(Math.random() * array.length);
        qtdShakeSize--;

        newRandomQuantity =  Math.floor((Math.random() * 10) + 1);
        array[firstRandomIndex].quantity = newRandomQuantity;
    }

    while (0 !== lineShakeSize) {
        firstRandomIndex = Math.floor(Math.random() * array.length);
        secRandomIndex = Math.floor(Math.random() * array.length);
        lineShakeSize--;

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
        changedObject = shake(docs, PERCENTAGE_QTDS_SHAKE, PERCENTAGE_LINES_SHAKE);

        db.collection("shopping_quants_"+PERCENTAGE_QTDS_SHAKE+"_lines_"+PERCENTAGE_LINES_SHAKE).insert(changedObject, function(err, result){
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
