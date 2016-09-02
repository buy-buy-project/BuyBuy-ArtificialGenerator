module.exports = function(app){
    
    app.get("/", function(req, res){
        res.json(app.shopping)
    });

    app.get("/experimento1/:id", function(req, res){
        var id = parseInt(req.params.id);
        DATABASE.collection("shopping").find({"produto_id": id}, {"_id": 0}).toArray(function(err, result){
            res.json(result);    
        });
    });

    var randomQuantityProductBuy = function(currentDay, daysInterval){
        var seed;
        if(Number.isInteger(currentDay/daysInterval)){
            seed = 5;
            //seed = Math.floor((Math.random() * 10) + 1);
        } else{
            seed = 0;
        }
        return seed;
    }

    //Use here to do the gaussian
    function randomIntFromInterval(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    var shopping = { buy: [] }
     ,  collection = DATABASE.collection("shopping")
     ,  seed
     , unitBuy
     , product = {};

    for(var day = 1; day < 91; day++){
        for(var buy = 0; buy <= 30; buy++){

            seed = randomQuantityProductBuy(day, app.products.stock[buy].daysIntervalNearly)    
            
            product.produto_id = app.products.stock[buy].id;
            product.produto_name = app.products.stock[buy].name;

            unitBuy = {
                "consumidor": app.costumers.base[0].id,
                "produto_id": app.products.stock[buy].id,
                "quantidade": seed,
                "data_lista": moment().subtract(day, 'days').format("YYYY-MM-DD")
            }

            shopping.buy.push(unitBuy);    
            collection.insert(unitBuy, function(err, result){});
        }
    }
    

    return shopping;
}   