const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

var promoters = require('./routes/promoters');
var workers = require('./routes/workers');
var influencers = require('./routes/influencers');
var login = require('./routes/login');

var app = express();
app.get('/', (req, res) => {
  res.send('Hello World!')
});

mongoose.connect("mongodb+srv://manpreet:manpreet@123@boomcluster.vu9sc.mongodb.net/boom-advertise?retryWrites=true&w=majority", {
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


app.use('/workers', workers);
app.use('/promoters', promoters);
app.use('/influencers', influencers);
app.use('/login', login);

module.exports = app;