
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const worker = require('../models/workers');
const email = require('../config/email');
const nodemailer = require('nodemailer');
var passwordHash = require('password-hash');

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

var sendEmail = function(to,subject,html) {
  return new Promise(function(resolve, reject) {
    var transporter = nodemailer.createTransport({
        
      service: 'gmail', 
      port:465,
      auth: { 
        user: email.email,
        pass: email.password
      } ,
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    });
  
  var mailOptions = {
    from: 'faanmanagement@gmail.com  <http://boomadvertise.com/>',
    to: to,
    subject: subject,
    html: html
  };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      reject(error);
    } else {
     resolve(1)
    }
  });

  
});

}


router.post('/register', function(req,res) {
  var coupon_code  = Math.random().toString(36).slice(2)

      var workerCreate =  new worker.workers(req.body.worker_signup);

      var datetime = new Date();
      let pass = passwordHash.generate(req.body.worker_signup.password)

      workerCreate.joindate = datetime
      workerCreate.password = pass
      workerCreate.coupon_code = coupon_code
      
      worker.workers.findOne({email:req.body.worker_signup.email}, function(err, workers) {
        if (err)  res.json({status:"failure",statusCode:100,msg:err});
        
        if(workers){
          res.json({status:"failure",statusCode:100,msg:"Email already exists!!"});
        }else{
            worker.workers.findOne({name:req.body.worker_signup.name}, function(err, workers) {
            if (err)  res.json({status:"failure",statusCode:100,msg:err});
        
            if(workers){
              
              res.json({status:"failure",statusCode:100,msg:"Username already exists!!"});
            }
            else{
                workerCreate.save(function (err, worker) {
                  sendEmail('vsingh@codenomad.net',"my subject",
                     "Your login account!","You have been added as a Worker on <b>http://boomadvertise.com/</b><br> Here are your login credentials along with other details. <br> Username: " + req.body.worker_signup.name + "<br> Email: " +req.body.worker_signup.email +"<br> Password: " + req.body.worker_signup.password +" Promo code: fjhdgggdffg <br> Sharaeble Urls with others : http://boomadvertise.com/"+worker['_id']);
                  if (err) res.json({status:"failure",statusCode:100,msg:error});
                  res.json({status:"success",statusCode:200,data:worker,msg:"Worker added successfully and an email has been sent to the worker."});
                
              });
            }
          })
        }
      }); 
      
    });

    
    router.post('/email', function(req,res) { 
      /******Send email***** */
     
      
      var a =  sendEmail('vsingh@codenomad.net',
        "Your login account!",
        'You have been added as a Worker on <b>http://boomadvertise.com/</b><br> Here are your login credentials along with other details. <br> Promo code: fjhdgggdffg <br> Sharaeble Urls with others : http://boomadvertise.com/')
        a.then((result) => { 
       if(result){
        res.json({status:"success",statusCode:200,data:'hii sent email...'});
       }
       else{
        res.json({status:"failure",statusCode:100,message:"There was some error in youyr request!!!",data:[]});
       }
        }).catch((err) => {
          res.json({status:"failure",statusCode:100,message:"Could Not Send Email!!!",data:err});
        });
     /******Send email end***** */
      });




    
    
    module.exports = router;


