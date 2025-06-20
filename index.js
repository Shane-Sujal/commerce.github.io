const express = require('express');
const ejsroutes = require('./Routes/indexroute');
const connection = require('./Connection/connection');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
require('dotenv').config();
const password = process.env.PASSWORD;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// url of the mongodb
const url = "mongodb+srv://shanesujal:uhcfAtRYbrwl8ETD@cluster0.o8lpals.mongodb.net/";
app.set('view engine', 'ejs');

// Assets routes
app.use('/Assets/', express.static('./Assets'));

// Ejs html page routes
app.use('/', ejsroutes);

// Connection routes
connection(url);

app.listen(PORT, (err) => {
    if (err) {
        console.log('Error found while listening to the port=' + PORT);
    } else {
        console.log('Listening to the port=' + PORT);
    }
});
