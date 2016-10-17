module.exports = function(app){

    app.get("/experimento2/:id/:noise/:intervalDay", function(req, res){
        var id = parseInt(req.params.id)
        , noise = parseFloat(req.params.noise)
        , intervalDayReceived = parseInt(req.params.intervalDay)
        , media = 50
        , Xvalues = []
        , vectorZAO = []
        , shopping = { buy: [] }
        , quantityOfBuy
        , unitBuy
        , product = {};
             
        var randomQuantityProductBuy = function(currentDay, daysInterval){
            var quantityOfBuy;
            
            for(var X=media-35; X != media+35   ; X++){
                normalDistribution(X, media, noise);                    
            }

            if(Number.isInteger(currentDay/daysInterval)){
                quantityOfBuy = buyQuantity();
            }
            else
                quantityOfBuy = 0;

            return quantityOfBuy;
        }

        var buyQuantity = function(){
            var sumPercentages = 0 ;

            if(!vectorZAO.length){
                for(pos in Xvalues){                    
                    var spaceOnVector = Xvalues[pos].percentage * 5000;
                    if(spaceOnVector > 1){
                        for(i = spaceOnVector; i >= 1; i--){
                            vectorZAO.push(Xvalues[pos].value);
                        }
                    }
                }
            }
            
            return vectorZAO[ Math.floor(Math.random() * (vectorZAO.length) )];
        }

        var normalDistribution = function(X, media, sigma){
            if(X < 0) X = 0;
            
            //Gaussian count:
            var firstPart =  1 / (Math.pow (2 * Math.PI * (Math.pow(2, sigma)) , 1/2) );
            var potentiatesE = -( (Math.pow(( X - media ), 2)) / (2*(Math.pow(sigma, 2))) );
            var secondPart = Math.pow(Math.exp(1), potentiatesE);
            var result = firstPart * secondPart;
            
            Xvalues.push( {"value": X, "percentage": result} );

            return result;
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
        }
        
        res.json(shopping.buy);
    });
}   