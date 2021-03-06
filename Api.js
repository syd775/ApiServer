require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const key = process.env.KEY;
const secret = process.env.SECRET;
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const URI = process.env.URI;

const server = app.listen(port, ()=>{
    console.log('server running');
});

//connect to db
mongoose.connect(URI);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("DB Connection Established");
});

const userRouter = require('./userRoutes.js');
app.use('/users', userRouter)


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
});

module.exports = server;