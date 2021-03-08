
var   express       = require('express');
var   router        = express.Router();
var   mongoose      = require('mongoose');
const promoter      = require('../models/promoters');
const email         = require('../config/email');
const nodemailer    = require('nodemailer');
var   passwordHash  = require('password-hash');

  //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

  // Send Email Function 

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
      from: email.email+' <http://boomadvertise.com/>',
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
          
          var promoterCreate =  new promoter.promoters(req.body.promoter_signup);

          var datetime = new Date();
          let pass = passwordHash.generate(req.body.promoter_signup.password)

          promoterCreate.joindate = datetime
          promoterCreate.password = pass
          
          promoter.promoters.findOne({email:req.body.promoter_signup.email}, function(err, promoters) {
            if (err)  res.json({status:"failure",statusCode:100,msg:err});
            
            if(promoters){
             
              res.json({status:"failure",statusCode:100,msg:"Email already exists!!"});
            }else{
                promoter.promoters.findOne({name:req.body.promoter_signup.name}, function(err, promoters) {
                if (err)  res.json({status:"failure",statusCode:100,msg:err});
            
                if(promoters){
                  
                  res.json({status:"failure",statusCode:100,msg:"Username already exists!!"});
                }
                else{
                    promoterCreate.save(function (err, promoter) {
                    if (err) res.json({status:"failure",statusCode:100,msg:err});
                
                    res.json({status:"success",statusCode:200,data:promoter,msg:"Signup & SignIn successfully!"});
                  });
                }
              })
            }
          }); 
          
        });

    router.post('/singlePromoter', function(req, res) {
      promoter.promoters.find({_id:req.body.id}, function(err, promoter_data) {
        if (err)  res.json({status:"failure",statusCode:100,error:err});
        res.json({status:"success",statusCode:200,data:promoter_data});
      });
    });

    router.post('/send_request_quotes',function(req , res){

      
      let html_content  = req.body.description;
      let subject       = "Request Quotes";
      let to_email      = req.body.email.trim();
      
      var a =  sendEmail(to_email , subject,html_content)
        a.then((result) => { 

          if(result){
          
            res.json({status:"success",statusCode:100,message:'Email sent successfully...'});
          } else {

            res.json({status:"failure",statusCode:200,message:"There was some error in youyr request!!!",data:''});
          }

        }).catch((err) => {
          
          res.json({status:"failure",statusCode:200,message:"Could Not Send Email!!!",data:err});
        });

     
    });

    module.exports = router;