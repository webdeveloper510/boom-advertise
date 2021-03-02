const express     = require('express');
var mongoose      = require('mongoose');
var bodyParser    = require('body-parser');
var path          = require('path');
var cors          = require('cors');

require("@babel/register");

//require("babel-polyfill");
require("@babel/polyfill");
require('dotenv').config();
const logger = require('express-logger');
const cookieParser = require('cookie-parser');
const session = require('express-session');

var promoters   = require('./routes/promoters');
var workers     = require('./routes/workers');
var influencers = require('./routes/influencers');
var login       = require('./routes/login');
var sessions    = require('./routes/sessionsController');

var app = express();
app.use(express.static('./uploads'));

app.get('/', (req, res) => {
  
  res.send("Hello World!")
});

app.use(function(req, res, next) {
  //set headers to allow cross origin request.
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });

mongoose.connect("mongodb+srv://vijay:vijay@123@cluster0.bnvrw.mongodb.net/boomadvertise?retryWrites=true&w=majority",  {
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


//app.use(logger({ path: "log/express.log" }));
app.use(cookieParser());

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
app.use('/sessions', sessions);

module.exports = app;