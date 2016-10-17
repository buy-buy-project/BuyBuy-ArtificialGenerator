module.exports = function(app){
    
    app.get("/", function(req, res){
        res.json(app.shopping)
    });

    app.get("/experimento1/:id", function(req, res){
        var id = parseInt(req.params.id);
        DATABASE.collection("exeperiment1").find({"produto_id": id}, {"_id": 0}).toArray(function(err, result){
            res.json(result);    
        });
    });

    var randomQuantityProductBuy = function(currentDay, daysInterval){
        var quantity;
        if(Number.isInteger(currentDay/daysInterval))
            quantity = 5;
        else
            quantity = 0;
        
        return quantity;
    }


    var shopping = { buy: [] }
     ,  collection = DATABASE.collection("exeperiment1")
     , unitBuy
     , product = {};

    for(var day = 1; day < 91; day++){
        for(var buy = 0; buy <= 30; buy++){
            var quantity = randomQuantityProductBuy(day, app.products.stock[buy].daysIntervalNearly)    
            
            unitBuy = {
                "consumidor": 1,
                "produto_id": app.products.stock[buy].id,
                "quantidade": quantity,
                "data_lista": moment().subtract(day, 'days').format("YYYY-MM-DD")
            }

            shopping.buy.push(unitBuy);    
            //collection.insert(unitBuy, function(err, result){});
        }
    }
    

    return shopping;
}   