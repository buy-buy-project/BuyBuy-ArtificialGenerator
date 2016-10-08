module.exports = function(app) {

    app.get("/produtos", function(req, res){
        DATABASE.collection("products").find({}, {"_id": 0, "daysIntervalNearly":0}).toArray(function(err, result){
            res.json(result);    
        });
    });

    var collection = DATABASE.collection("products");

    var products = 
    {
        stock: [
            {
                "id": 0,
                "name": "Agua",
                "daysIntervalNearly": 3
            },
            {
                "id": 1,
                "name": "Arroz",
                "daysIntervalNearly": 3
            },
            {
                "id": 2,
                "name": "Feijao",
                "daysIntervalNearly": 3
            },
            {
                "id": 3,
                "name": "Leite",
                "daysIntervalNearly": 3
            },                
            {
                "id": 4,
                "name": "Cafe",
                "daysIntervalNearly": 3
            },                
            {
                "id": 5,
                "name": "Laranja",
                "daysIntervalNearly": 3
            },                
            {
                "id": 6,
                "name": "Banana",
                "daysIntervalNearly": 3
            },                
            {
                "id": 7,
                "name": "Biscoito",
                "daysIntervalNearly": 3
            },                
            {
                "id": 8,
                "name": "Refrigerante",
                "daysIntervalNearly": 3
            },                
            {
                "id": 9,
                "name": "Carne",
                "daysIntervalNearly": 3
            },                
            {
                "id": 10,
                "name": "Frango",
                "daysIntervalNearly": 3
            },                
            {
                "id": 11,
                "name": "Ovo",
                "daysIntervalNearly": 3
            },                
            {
                "id": 12,
                "name": "Shampoo",
                "daysIntervalNearly": 3
            },          
            {
                "id": 13,
                "name": "Pasta de Dente",
                "daysIntervalNearly": 3
            },                
            {
                "id": 14,
                "name": "Papel Higiênico",
                "daysIntervalNearly": 3
            },                
            {
                "id": 15,
                "name": "Sabonete",
                "daysIntervalNearly": 3
            },                
            {
                "id": 16,
                "name": "Azeite",
                "daysIntervalNearly": 3
            },                
            {
                "id": 17,
                "name": "Sal",
                "daysIntervalNearly": 3
            },                
            {
                "id": 18,
                "name": "Açucar",
                "daysIntervalNearly": 3
            },                
            {
                "id": 19,
                "name": "Cerveja",
                "daysIntervalNearly": 3
            },                
            {
                "id": 20,
                "name": "Sorvete",
                "daysIntervalNearly": 3
            },                
            {
                "id": 21,
                "name": "Abacaxi",
                "daysIntervalNearly": 3
            },                
            {
                "id": 22,
                "name": "Melancia",
                "daysIntervalNearly": 3
            },                
            {
                "id": 23,
                "name": "Melao",
                "daysIntervalNearly": 3
            },                
            {
                "id": 24,
                "name": "Cenoura",
                "daysIntervalNearly": 3
            },                
            {
                "id": 25,
                "name": "Desodorante",
                "daysIntervalNearly": 3
            },                
            {
                "id": 26,
                "name": "Queijo",
                "daysIntervalNearly": 3
            },                
            {
                "id": 27,
                "name": "Pao",
                "daysIntervalNearly": 3
            },                
            {
                "id": 28,
                "name": "Bolacha",
                "daysIntervalNearly": 3
            },                
            {
                "id": 29,
                "name": "Cebola",
                "daysIntervalNearly": 3
            },                
            {
                "id": 30,
                "name": "Alho",
                "daysIntervalNearly": 3
            }
        ],
    };

    //collection.insert(products.stock, function(err, result){});
    
    return products;
}