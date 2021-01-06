const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
// const jwt = require('jsonwebtoken');
// const expressJwt = require('express-jwt');

// const Twitter = require('twit');
// const client = new Twitter({
//   consumer_key: 'PwtlyF8xzKLgIPNDwS42nL87G',
//   consumer_secret: 'hg9QMATkfZp0ZW3K5TXRFvwfsMCe5JChzlbf2Tb3JjL7rJCWUc',
//   access_token: '1344238274177617920-piB0c83dH5ofjZpLYkQdlTEpmvm09Q',
//   access_token_secret: 'ld4Y9vi6Txj1mULJapoix0wiHVuA03KyNaB7WviHZEKFd'
// });


/** */
require("@babel/register");

//require("babel-polyfill");
require("@babel/polyfill");
require('dotenv').config();
const logger = require('express-logger');
const cookieParser = require('cookie-parser');
const session = require('express-session');
/** */

// const corsOption = {
//   origin: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   exposedHeaders: ['x-auth-token']
// };

var promoters = require('./routes/promoters');
var workers = require('./routes/workers');
var influencers = require('./routes/influencers');
var login = require('./routes/login');
var sessions = require('./routes/sessionsController');

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

// const authenticate = expressJwt({
//   secret: process.env.EXPRESS_JWT_SECRET,
//   requestProperty: 'auth',
//   getToken: (req) => {
//       if(req.headers['x-auth-token']) {
//           return req.headers['x-auth-token'];
//       }
//       return null;
//   }
// });



// const getCurrentUser = async (req, res, next) => {
//   try {   
//       const user = await User.findById(req.auth.id);
//       req.user = user;
//       next();
//   } catch(error) {
//       next(error);
//   }
// };

// const getSingle = (req, res) => {
//   const user = req.user.toObject();
//   delete user['facebook'];
//   delete user['__v'];
//   res.json(user);
// };

// app.use('/users', require('./routes/users'));

// router.route('/auth/me')
//     .get(authenticate, getCurrentUser, getSingle);

// app.use('/api', router);


//app.use(logger({ path: "log/express.log" }));
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


// app.get('/api/user', (req, res) => {
//   client.get('account/verify_credentials').then(user => {
//     res.send(user)
//   }).catch(error => {
//     res.send(error);
//   });
// });


module.exports = app;