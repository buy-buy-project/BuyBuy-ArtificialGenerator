var express = require('express')
  , load = require('express-load')
  , app  = express()
  , PORT = 4000
  , mongo = require('mongodb').MongoClient;

 mongo.connect('mongodb://localhost:27017/buybuy', function(err, db) {
    if(err) throw err;

    console.log("Connected correctly to Mongo");
    global.DATABASE = db; 


    load('products').
      then('costumers').
      then('shopping').
      into(app);

    app.listen(PORT, function (){
      console.log("Running Server on " + PORT);
    });
});








