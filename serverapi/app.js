const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

const multer = require('multer');
var fileExtension = require('file-extension');
// const jwt = require('jsonwebtoken');
// const expressJwt = require('express-jwt');

// const Twitter = require('twit');
// const client = new Twitter({
//   consumer_key: 'PwtlyF8xzKLgIPNDwS42nL87G',
//   consumer_secret: 'hg9QMATkfZp0ZW3K5TXRFvwfsMCe5JChzlbf2Tb3JjL7rJCWUc',
//   access_token: '1344238274177617920-piB0c83dH5ofjZpLYkQdlTEpmvm09Q',
//   access_token_secret: 'ld4Y9vi6Txj1mULJapoix0wiHVuA03KyNaB7WviHZEKFd'
// });

//create a cors middleware


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
app.use(express.static('uploads'));
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

// Configure Storage
// var storage = multer.diskStorage({

//   // Setting directory on disk to save uploaded files
//   destination: function (req, file, cb) {
//       cb(null, 'uploads')
//   },
 

//   // Setting name of file saved
//   filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
//   }
// })


// var upload = multer({
//   storage: storage,
//   limits: {
//       // Setting Image Size Limit to 2MBs
//       fileSize: 2000000
//   },
//   fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//           //Error 
//           cb(new Error('Please upload JPG and PNG images only!'))
//       }
//       //Success 
//       cb(undefined, true)
//   }
// })

// app.post('/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
//   const file = req.file
//   console.log(req);
//   if (!file) {
//       const error = new Error('Please upload a file')
//       error.httpStatusCode = 400
//       return next(error)
//   }
//   res.status(200).send({
//       statusCode: 200,
//       status: 'success',
//       uploadedFile: file
//   })

// }, (error, req, res, next) => {
//   res.status(400).send({
//       error: error.message
//   })
// })








module.exports = app;