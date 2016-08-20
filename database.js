var mongo = require('mongodb').MongoClient;

module.exports = function(app){

    global.database = mongo.connect('mongodb://localhost:27017/buybuy', function(err, db) {
        //  assert.equal(null, err);
        console.log("Connected correctly to Mongo");
        
        var shopping = db.collection("shopping");
        shopping.find({}).toArray(function(err, docs){
            console.log(docs)
        });
        global.DATABASE = db; 
        //db.close();
    });

}
