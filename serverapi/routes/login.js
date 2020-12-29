
var express = require('express');
var router = express.Router();
//const nodemailer = require('nodemailer');
var mongoose = require('mongoose');
const promoters = require('../models/promoters');
const influencers = require('../models/influencers');
var passwordHash = require('password-hash');
//const user = require('../models/users');
//const email = require('../config/email');
// const app = express();
// const cors = require("cors");
// app.use(function (req, res, next) {
//     //Enabling CORS
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//     next();
// });


router.post('/', function(req, res) {
   console.log(req.body.signin)
  if(req.body.signin.user_type == 0){

    if(!passwordHash.isHashed(req.body.signin.password)){
      var hashedPassword = passwordHash.generate(req.body.signin.password);
      //console.log(hashedPassword)
      influencers.influencers
        .find({ $or : [{name:req.body.signin.email},{'email':req.body.signin.email}]},function (err, influencers) {
        if (err) {
            res.json({status:"failure",statusCode:600,msg:err});
        }else if(influencers.length==0){
          console.log('hii man');
          console.log(influencers.length);
          res.json({status:"failure",statusCode:500,msg:"Invalid Credentials!!!"});
        }
          else{
            if(passwordHash.verify(req.body.signin.password, influencers[0].password)){
              console.log(influencers)
              res.json({status:"success",statusCode:200,data:influencers,msg:"Login successfully..."});
            }else{
              res.json({status:"failure",statusCode:100,msg:"Invalid Credentials!!!"});
            }
          }
      });
    }

  }else{
    if(!passwordHash.isHashed(req.body.signin.password)){
      var hashedPassword = passwordHash.generate(req.body.signin.password);
      //console.log(hashedPassword)
      promoters.promoters
        .find({ $or : [{name:req.body.signin.email},{'email':req.body.signin.email}]},function (err, promoters) {
        if (err) {
            res.json({status:"failure",statusCode:100,msg:err});
        }else if(promoters.length==0){
          res.json({status:"failure",statusCode:100,msg:"Invalid Credentials!!!"});
        }
          else{
            if(passwordHash.verify(req.body.signin.password, promoters[0].password)){
              console.log(promoters)
              res.json({status:"success",statusCode:200,data:promoters,msg:"Login successfully..."});
            }else{
              res.json({status:"failure",statusCode:100,msg:"Invalid Credentials!!!"});
            }
          }
      });
    }
  }
    // else{
    // promoters.promoters
    // .find({ $or : [{name:req.body.signin.email},{'email':req.body.signin.email}]},function (err, promoters) {
      
    //     if (err) {
    //         res.json({status:"failure",statusCode:100,data:err});
    //     }else if(promoters.length==0){
    //       res.json({status:"failure",statusCode:100,data:"Invalid Credentials!!!"});
    //       }
    //       else{
    //         if(passwordHash.verify(req.body.signin.password, promoters[0].password)){
    //           console.log(promoters)
    //           res.json({status:"success",statusCode:200,data:promoters});
    //         }
    //       }
    //   });
    // } 
  });

  module.exports = router;