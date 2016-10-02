module.exports = function(app){
    app.get("/consumidores", function(req,res){
        res.json(app.costumers)
    });

    return costumers =
    {
        base: [
            {
                "id": 1,
                "name": "Cristiano Ronaldo"
            },
            {
                "id": 2,
                "name": "Lewis Hamilton"
            }
        ]
    }
}