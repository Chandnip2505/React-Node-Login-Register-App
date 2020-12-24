const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
const cors = require('cors');
const app = express();

const user = require('./routes/user.route');
const mongoURL = 'mongodb://localhost:27017/UserSystem';
mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
  }
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors(corsOptions));
app.use('/users', user);
app.use(jwt());
app.listen(4000, () => {
    console.log("server is up at 4000");
})