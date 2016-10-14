module.exports = function(app){

    app.get("/experimento4/:id/:quantityNoise/:timeNoise/:intervalDay", function(req, res){
        var id = parseInt(req.params.id);
        var quantityNoise = parseFloat(req.params.quantityNoise);
        var timeNoise = parseFloat(req.params.timeNoise);
        var intervalDayReceived = parseFloat(req.params.intervalDay);
        var media = 50;
        var Xvalues = [];
        var Xtimes = [];
        var vectorZAO = [];
        var shopping = { buy: [] }
        , collection = DATABASE.collection("shopping")
        , quantityOfBuy
        , unitBuy
        , product = {};
             
        var randomQuantityProductBuy = function(currentDay, daysInterval){
            var quantityOfBuy;
            
            for(var X=media-35; X != media+35   ; X++){
                normalDistribution(X, media, quantityNoise, 'quantity');                    
            }
            //res.json(Xvalues)
            //res.json(sortValue(Xvalues));

            if(Number.isInteger(currentDay/daysInterval)){
                //quantityOfBuy = media;
                quantityOfBuy = sortValue(Xvalues);
            }
            else
                quantityOfBuy = 0;
            
            return quantityOfBuy;
        }

        var sortValue = function(probabilities){
            var sumPercentages = 0 ;

            if(!vectorZAO.length){
                for(pos in probabilities){                    
                    var spaceOnVector = probabilities[pos].percentage * 5000;
                    if(spaceOnVector > 1){
                        for(i = spaceOnVector; i >= 1; i--){
                            vectorZAO.push(probabilities[pos].value);
                        }
                    }
                }
            }
            
            return vectorZAO[ Math.floor(Math.random() * (vectorZAO.length) )];
            //return vectorZAO;
        }

        var normalDistribution = function(X, media, sigma, experiment){
            if(X < 0) X = 0;
            
            //Gaussian count:
            var firstPart =  1 / (Math.pow (2 * Math.PI * (Math.pow(2, sigma)) , 1/2) );
            var potentiatesE = -( (Math.pow(( X - media ), 2)) / (2*(Math.pow(sigma, 2))) );
            var secondPart = Math.pow(Math.exp(1), potentiatesE);
            var result = firstPart * secondPart;
            
            if(experiment == 'quantity'){
                Xvalues.push( {"value": X, "percentage": result} );
            } else if (experiment == 'time'){
                Xtimes.push( {"value": X, "percentage": result} );
            }

            return result;
        }

        var shakeTime = function(){
            var mediaTeste = 3;  
            vectorZAO = [];
            
            for(var X=mediaTeste-2; X != mediaTeste+3; X++){
                normalDistribution(X, mediaTeste, timeNoise, 'time');                    
            }

            for(pos in shopping.buy){
                var neighborIndexSorted = parseInt(pos) + sortValue(Xtimes)-3;
                
                if(neighborIndexSorted > 363) neighborIndexSorted = 363;
                
                if(pos <= 6){
                    while(neighborIndexSorted < 0){
                        neighborIndexSorted = parseInt(pos) + sortValue(Xtimes)-3
                    }
                }
                
                var temp = shopping.buy[pos].quantidade;
                shopping.buy[pos].quantidade = shopping.buy[neighborIndexSorted].quantidade
                shopping.buy[neighborIndexSorted].quantidade = temp;
            } 
        }

        for(var day = 1; day < 365; day++){
            quantityOfBuy = randomQuantityProductBuy(day, intervalDayReceived)

            unitBuy = {
                "consumidor": 1,
                "produto_id": app.products.stock[id].id,
                "quantidade": quantityOfBuy,
                "data_lista": moment().subtract(day, 'days').format("YYYY-MM-DD")
            }

            shopping.buy.push(unitBuy);    

            //collection.insert(unitBuy, function(err, result){});
        }
        
        shakeTime();
        res.json(shopping.buy);
    });
}   