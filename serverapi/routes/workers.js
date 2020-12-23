
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const worker = require('../models/workers');
//const email = require('../config/email');
//const nodemailer = require('nodemailer');
var passwordHash = require('password-hash');

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

router.post('/register', function(req,res) {
console.log(req.body.worker_signup);
      var workerCreate =  new worker.workers(req.body.worker_signup);

      var datetime = new Date();
      let pass = passwordHash.generate(req.body.worker_signup.password)

      workerCreate.joindate = datetime
      workerCreate.password = pass
      
      worker.workers.findOne({email:req.body.worker_signup.email}, function(err, workers) {
        if (err)  res.json({status:"failure",statusCode:100,error:err});
        
        if(workers){
          console.log(workers)
          res.json({status:"failure",statusCode:100,error:"Email already exists!!"});
        }else{
            worker.workers.findOne({name:req.body.worker_signup.name}, function(err, workers) {
            if (err)  res.json({status:"failure",statusCode:100,error:err});
        
            if(workers){
              console.log(workers)
              res.json({status:"failure",statusCode:100,error:"Username already exists!!"});
            }
            else{
                workerCreate.save(function (err, worker) {
                if (err) res.json({status:"failure",statusCode:100,error:err});
            
                res.json({status:"success",statusCode:200,data:worker});
              });
            }
          })
        }
      }); 
      
    });

    module.exports = router;