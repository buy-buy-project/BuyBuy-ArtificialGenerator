module.exports = function(app) {
    
    /**
    app.get('/products', function(req, res){
        res.json(app.products);
    });
    */
     
    app.get("/produtos", function(req, res){
        DATABASE.collection("products").find({}, {"_id": 0, "daysIntervalNearly":0}).toArray(function(err, result){
            res.json(result);    
        });
    });

    var collection = DATABASE.collection("products");
    //var daysIntervals = [3,5,7,14,30];
    var daysIntervals = [3,3,3,3,3];

    var products = 
    {
        stock: [
            {
                "id": 0,
                "name": "Agua",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },
            {
                "id": 1,
                "name": "Arroz",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },
            {
                "id": 2,
                "name": "Feijao",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },
            {
                "id": 3,
                "name": "Leite",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 4,
                "name": "Cafe",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 5,
                "name": "Laranja",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 6,
                "name": "Banana",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 7,
                "name": "Biscoito",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 8,
                "name": "Refrigerante",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 9,
                "name": "Carne",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 10,
                "name": "Frango",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 11,
                "name": "Ovo",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 12,
                "name": "Shampoo",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },          
            {
                "id": 13,
                "name": "Pasta de Dente",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 14,
                "name": "Papel Higiênico",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 15,
                "name": "Sabonete",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 16,
                "name": "Azeite",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 17,
                "name": "Sal",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 18,
                "name": "Açucar",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 19,
                "name": "Cerveja",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 20,
                "name": "Sorvete",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 21,
                "name": "Abacaxi",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 22,
                "name": "Melancia",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 23,
                "name": "Melao",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 24,
                "name": "Cenoura",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 25,
                "name": "Desodorante",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 26,
                "name": "Queijo",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 27,
                "name": "Pao",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 28,
                "name": "Bolacha",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 29,
                "name": "Cebola",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            },                
            {
                "id": 30,
                "name": "Alho",
                "daysIntervalNearly": daysIntervals[ Math.floor((Math.random() * 5)) ]
            }
        ],
    };

    //collection.insert(products.stock, function(err, result){});
    
    return products;
}