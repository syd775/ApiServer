const express = require('express');
const app = express();
const port = 8080;

app.listen(port, ()=>{
    console.log('server running');
})
let petfinder = require("@petfinder/petfinder-js");
 client = new petfinder.Client({apiKey: "uWfFrqpZBBniSqxk33jTs44c0Wwp9GoZGvRM1RULbebp2v0B3M", secret: "9bmfcblM9bxMw52xz7WCrpdCjK3b8zA145Z6eH9r"});




client.animal.search();


app.get("/", (req,res) => {
    client.animal.search(req.body)
     .then(function (response) {
         
         res.type('application/json');
         res.json(response.data.animals);
         console.log(JSON.parse(req.body));

     })
     .catch(function (error) {
         console.log(error);
     });
})