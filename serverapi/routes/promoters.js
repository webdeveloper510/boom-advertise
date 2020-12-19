
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const promoter = require('../models/promoters');
//const email = require('../config/email');
//const nodemailer = require('nodemailer');
var passwordHash = require('password-hash');

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

router.get('/register', function(req,res) {
       console.log("hiii hiiii")
      // console.log(req.body)
      // console.log(req.body.name)
     //  res.json(req.body.name)
       
    //   console.log(pass)
    //   console.log(passwordHash.verify(req.body.data.password,pass))
    //  return false
      
      var promoterCreate =  new promoter.promoters(req.body);

      var datetime = new Date();
      let pass = passwordHash.generate(req.body.password)

      promoterCreate.joindate = datetime
      promoterCreate.password = pass

      //res.json(datetime)
      //let pass = passwordHash.generate(userCreate.password)
     // console.log(passwordHash.verify(userCreate.password,pass))
      //return false
      
      promoter.promoters.findOne({email:req.body.email}, function(err, promoters) {
        if (err)  res.json({status:"failure1",statusCode:100,error:err});
        
        if(promoters){
          console.log(promoters)
          res.json({status:"failure2",statusCode:100,error:"Email already exists!!"});
        }else{
            promoter.promoters.findOne({name:req.body.name}, function(err, promoters) {
            if (err)  res.json({status:"failure3",statusCode:100,error:err});
        
            if(promoters){
              console.log(promoters)
              res.json({status:"failure4",statusCode:100,error:"Username already exists!!"});
            }
            else{
                promoterCreate.save(function (err, promoter) {
                if (err) res.json({status:"failure5",statusCode:100,error:err});
            
                res.json({status:"success",statusCode:200,data:promoter});
              });
            }
          })
        }
      }); 
      
    });

    module.exports = router;