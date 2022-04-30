require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const key = process.env.KEY;
const secret = process.env.SECRET;
//update deployment
const jsonParser = bodyParser.json();

app.listen(port, ()=>{
    console.log('server running');
})
let petfinder = require("@petfinder/petfinder-js");
 client = new petfinder.Client({apiKey: key, secret: secret});

app.get("/pets", jsonParser, (req, res) => {
    console.log(req.body);
    client.animal.search(req.body)
     .then(function (response) {
         res.type('application/json');
         res.json(response.data.animals);
     })
     .catch(function (error) {
         console.log(error);
     });
})