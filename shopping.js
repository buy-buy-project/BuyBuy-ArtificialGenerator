module.exports = function(app){
    app.get("/", function(req, res){
        res.json(app.shopping)
    });

    var shopping = { buy: [] };

    for(var day = 0; day <= 90; day++){
        for(var buy = 0; buy <= 30; buy++){

            var unitBuy = {
                    "costumer": app.costumers.base[0].id,
                    "product":  app.products.stock[Math.floor((Math.random() * 29) + 1)].id,
                    "quantity": Math.floor((Math.random() * 10) + 1),
                    "date": day
            }

            shopping.buy.push(unitBuy);    

            var collection = DATABASE.collection("shopping");
            collection.insert(unitBuy, function(err, result){
            });
        }
    }

    return shopping;
}   