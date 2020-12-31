const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

/** */
require("@babel/register");

//require("babel-polyfill");
require("@babel/polyfill");
require('dotenv').config();
const logger = require('express-logger');
const cookieParser = require('cookie-parser');
const session = require('express-session');
/** */

var promoters = require('./routes/promoters');
var workers = require('./routes/workers');
var influencers = require('./routes/influencers');
var login = require('./routes/login');
const sessions = require('./routes/sessionsController');

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
app.use('/email', workers);
app.use('/test', influencers);
app.use('/promoters', promoters);
app.use('/influencers', influencers);
app.use('/login', login);

/** */

app.use(logger({ path: "log/express.log" }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
app.use('/sessions', sessions);

/** */
// app.listen(8080, () => {
//   console.log('App running on port 8080!');
// });


module.exports = app;