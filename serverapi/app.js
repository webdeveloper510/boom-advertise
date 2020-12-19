const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var promoters = require('./routes/promoters');
//const app = express();
//const port = 1234;
var app = express();
app.get('/', (req, res) => {
  res.send('Hello World!')
});

mongoose.connect("mongodb+srv://boom-advertise.coukz.mongodb.net/boom-advertise?retryWrites=true&w=majority", {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() =>console.log('DB Connected!'))
.catch(err => {
console.log(err);
});


app.use(cors());
app.use(bodyParser.json({limit:'50mb',extended:true}));
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/promoters', promoters);


  module.exports = app;