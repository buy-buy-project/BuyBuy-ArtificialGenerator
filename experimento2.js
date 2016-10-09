module.exports = function(app){

    app.get("/experimento2/:id/:noise", function(req, res){
        var id = parseInt(req.params.id);
        var noise = parseFloat(req.params.noise);
        var media = 50;
        var Xvalues = [];

             
        var randomQuantityProductBuy = function(currentDay, daysInterval){
            var quantityOfBuy;
            
            for(var X=media-35; X != media+35   ; X++){
                normalDistribution(X, media, noise);                    
            }
            //res.json(Xvalues)

            if(Number.isInteger(currentDay/daysInterval)){
                //quantityOfBuy = gaussian(media, noise);
                
                //Gaussian 2
                //quantityOfBuy = sortGaussianValue();

                //Gaussian 3
                quantityOfBuy = buyQuantity();
            }
            else
                quantityOfBuy = 0;
            
            return quantityOfBuy;
        }

        var buyQuantity = function(){
            var sumPercentages = 0 ;
            var vectorZAO = [];

            for(pos in Xvalues){                    
                var spaceOnVector = Xvalues[pos].percentage * 5000;
                if(spaceOnVector > 1){
                    for(i = spaceOnVector; i >= 1; i--){
                        vectorZAO.push(Xvalues[pos].value);
                    }
                }
            }
            
            return vectorZAO[ Math.round(Math.random() * (vectorZAO.length) )];
            //return vectorZAO;
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

        var sortGaussianValue = function(){

            var normalizationFactor = 0;
            var sortVector = [];
            var quantity;

            for(var pos in Xvalues){
                normalizationFactor = normalizationFactor + Xvalues[pos].percentage;
            }

            normalizationFactor = 1 / normalizationFactor;

            for(var pos in Xvalues){
                Xvalues[pos].percentage = normalizationFactor * Xvalues[pos].percentage;
            }

            for(var pos in Xvalues){
                for(var i=0; i<=(Xvalues[pos].percentage * 100); i++){
                    sortVector.push(Xvalues[pos].value)
                }
            }
            //console.log(sortVector);
            //res.json(sortVector);

            quantity = sortVector[ Math.round(Math.random() * (sortVector.length) ) ]
            if(quantity < 0) quantity = 0;

            return quantity;

        }

        var gaussian = function (peakValue, sigma){
            var maximum = {};
            var minimum = {};
            var peak = {};
            var percentages = [];
            var allValues = [];
            var normalizationFactor = 0;
            var sortVector = [];
            peak.value = peakValue;
            maximum.value = peak.value + (parseInt(3 * sigma));
            minimum.value = peak.value - (parseInt(3 * sigma));
            
            if(minimum.value < 0 )
                minimum.value == 0;
            
            for(var i=maximum.value; i>=peak.value; i--){
                percentages.unshift(Math.pow(i,25));
            }
 
            peak.percentage = maximum.value;
            
            var j = 0;
            for(var i = minimum.value; i <= peak.value; i++){
                var teste = {};
                teste.percentage = percentages[j]
                teste.value = i
                allValues.push(teste)
                j++;
            }

            var k = 0;
            for(var i = maximum.value; i > peak.value; i--){
                var teste = {}
                teste.percentage = percentages[k]
                teste.value = i
                allValues.push(teste)
                k++;
            }
    
            for(var pos in allValues){
                normalizationFactor = normalizationFactor + allValues[pos].percentage;
            }

            normalizationFactor = 1 / normalizationFactor;

            for(var pos in allValues){
                allValues[pos].percentage = normalizationFactor * allValues[pos].percentage;
            }

            for(var pos in allValues){
                for(var i=0; i<=(allValues[pos].percentage * 100); i++){
                    sortVector.push(allValues[pos].value)
                }
            }
            //console.log(sortVector);
            //res.json(allValues);

            var quantity = sortVector[ Math.round((Math.random() * 100)) ]
            if(quantity < 0) quantity = 0;
            
            return quantity;
        }

        var shopping = { buy: [] }
        , collection = DATABASE.collection("shopping")
        , quantityOfBuy
        , unitBuy
        , product = {};

        for(var day = 1; day < 365; day++){
            quantityOfBuy = randomQuantityProductBuy(day, app.products.stock[id].daysIntervalNearly)    

            unitBuy = {
                "consumidor": 1,
                "produto_id": app.products.stock[id].id,
                "quantidade": quantityOfBuy,
                "data_lista": moment().subtract(day, 'days').format("YYYY-MM-DD")
            }

            shopping.buy.push(unitBuy);    
            //collection.insert(unitBuy, function(err, result){});
        }
        
        res.json(shopping.buy);
    });
}   