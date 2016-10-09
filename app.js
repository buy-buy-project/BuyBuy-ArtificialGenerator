var express = require('express')
  , load = require('express-load')
  , moment = require('moment')
  , app  = express()
  , PORT = 8081
  , mongo = require('mongodb').MongoClient;

 mongo.connect('mongodb://localhost:27017/buybuy', function(err, db) {
    if(err) 
      console.log("Error Mongo Connection");
    else{
      console.log("Connected correctly to Mongo");
      global.DATABASE = db; 
      global.moment = moment;

      load('products').
        then('shopping').
        then('experimento2').
        then('experimento3').
        into(app);

      app.listen(PORT, function (){
        console.log("Running Server on " + PORT);
      });
    }
});








