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

//connect to db
mongoose.connect('mongodb+srv://sydney95174:stellybean19@cluster0.fubcc.mongodb.net/test?retryWrites=true&w=majority');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("DB Connection Established");
});

let users = db.collection('users');

const userRouter = require('./userRoutes.js');
app.use('/users', userRouter)

app.listen(port, ()=>{
    console.log('server running');
});


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