module.exports = function(app){
    
    app.get("/", function(req, res){
        res.json(app.shopping)
    });

    var randomQuantityProductBuy = function(currentDay, daysInterval){
        var seed;
        if(Number.isInteger(currentDay/daysInterval)){
            seed = Math.floor((Math.random() * 10) + 1);
        } else{
            seed = 0;
        }
        return seed;
    }

    var shopping = { buy: [] }
     ,  collection = DATABASE.collection("shopping")
     ,  seed
     , unitBuy;

    for(var day = 0; day < 90; day++){
        for(var buy = 0; buy <= 30; buy++){

            seed = randomQuantityProductBuy(day, app.products.stock[buy].daysIntervalNearly)    

            unitBuy = {
                "costumer": app.costumers.base[0].id,
                "product":  app.products.stock[buy].id,
                "quantity": seed,
                "date": day
            }

            shopping.buy.push(unitBuy);    
            collection.insert(unitBuy, function(err, result){});
        }
    }

    return shopping;
}   