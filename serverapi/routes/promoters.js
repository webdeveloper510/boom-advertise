
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const promoter = require('../models/promoters');
//const email = require('../config/email');
//const nodemailer = require('nodemailer');
var passwordHash = require('password-hash');

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

router.post('/register', function(req,res) {
console.log(req.body.promoter_signup);
      var promoterCreate =  new promoter.promoters(req.body.promoter_signup);

      var datetime = new Date();
      let pass = passwordHash.generate(req.body.promoter_signup.password)

      promoterCreate.joindate = datetime
      promoterCreate.password = pass
      
      promoter.promoters.findOne({email:req.body.promoter_signup.email}, function(err, promoters) {
        if (err)  res.json({status:"failure",statusCode:100,msg:err});
        
        if(promoters){
          console.log(promoters)
          res.json({status:"failure",statusCode:100,msg:"Email already exists!!"});
        }else{
            promoter.promoters.findOne({name:req.body.promoter_signup.name}, function(err, promoters) {
            if (err)  res.json({status:"failure",statusCode:100,msg:err});
        
            if(promoters){
              console.log(promoters)
              res.json({status:"failure",statusCode:100,msg:"Username already exists!!"});
            }
            else{
                promoterCreate.save(function (err, promoter) {
                if (err) res.json({status:"failure",statusCode:100,msg:err});
            
                res.json({status:"success",statusCode:200,data:promoter,msg:"Signup Successfully! Click login to continueee..."});
              });
            }
          })
        }
      }); 
      
    });

    module.exports = router;