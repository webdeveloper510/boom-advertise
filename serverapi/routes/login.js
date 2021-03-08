
var express         = require('express');
var router          = express.Router();
var   mongoose      = require('mongoose');
const promoters     = require('../models/promoters');
const influencers   = require('../models/influencers');
var   passwordHash  = require('password-hash');
const email         = require('../config/email');
const nodemailer    = require('nodemailer');
const path = require('path') 

var Publishable_Key = 'pk_test_51HI9qMEXA7xfj1nHVxgdLB9TapBg5XlzSdvp991XoqXlLhePzY4I8l54WyzzRyDpMfWG8ubnIqUq7llRkahqiOsi00BDEFDLGg'
var Secret_Key = 'sk_test_51HI9qMEXA7xfj1nHePxD4KlYqi9nUUlpjvpDmwNQhMEyQCeTMCiUGw6AFWuJ4YytCyVgr9Br1BkqohBvFJGG3skO00THMGx9Fv'
const stripe = require('stripe')(Secret_Key);

  router.get("/email",function(req , res){

    
    let mailTransporter = nodemailer.createTransport({ 
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

  mailTransporter.verify(function(error, success) {
    if (error) {
      
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
    
  let mailDetails = { 
    from: email.email, 
    to: email.email, 
    subject: 'Test mail', 
    text: 'Node.js testing mail for GeeksforGeeks'
}; 

mailTransporter.sendMail(mailDetails, function(err, data) { 
  if(err) { 
      console.log('Error Occurs'); 
      console.log(err); 
  } else { 
      console.log('Email sent successfully'); 
  } 
}); 
    
    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     res.json({status:"failure",statusCode:200,errorssss:error,message:"Could Not Send Email!!!",auth: {
    //       user: email.email,
    //       pass: email.password
    //     }});
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //     res.json({status:"failure",statusCode:100,message: info.response,auth: {
    //       user: email.email,
    //       pass: email.password
    //     }});
    //   }
    // });

    

  }); 

router.post('/', function(req, res) {
  
  if(req.body.signin.user_type == 0){

    if(!passwordHash.isHashed(req.body.signin.password)){
      var hashedPassword = passwordHash.generate(req.body.signin.password);
     
      influencers.influencers
        .find({ $or : [{name:req.body.signin.email},{'email':req.body.signin.email}]},function (err, influencers) {
        if (err) {
            res.json({status:"failure",statusCode:600,msg:err});
        }else if(influencers.length==0){
          
          res.json({status:"failure",statusCode:500,msg:"Invalid Credentials!!!"});
        }
          else{
            if(passwordHash.verify(req.body.signin.password, influencers[0].password)){
             
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
      
      promoters.promoters
        .find({ $or : [{name:req.body.signin.email},{'email':req.body.signin.email}]},function (err, promoters) {
        if (err) {
            res.json({status:"failure",statusCode:100,msg:err});
        }else if(promoters.length==0){
          res.json({status:"failure",statusCode:100,msg:"Invalid Credentials!!!"});
        }
          else{
            if(passwordHash.verify(req.body.signin.password, promoters[0].password)){
             
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
    //         
    //           res.json({status:"success",statusCode:200,data:promoters});
    //         }
    //       }
    //   });
    // } 

    
  });

  router.post("/payment",async function(req , res){

    
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    let phone = req.body.phone;
    let description = req.body.description;
    let total_amount = req.body.total_amount;
    let stripe_email = req.body.stripe_email;
    let stripe_username = req.body.stripe_username;
    let card_number = req.body.stripe_cardnumber;
    let card_cvc = req.body.stripe_cvc;
    let stripe_zipcode = req.body.stripe_zipcode;
    let month_year = req.body.stripe_month_year.split('/');

    let exp_month = month_year[0];
    let exp_year  = month_year[1] ? month_year[1]: '';

    
  

    const token = await stripe.tokens.create({
        card: {
          number: card_number,
          exp_month: exp_month,
          exp_year: exp_year,
          cvc: card_cvc,
        },
    })
    .then((token) => { 
        //res.send(token)  // If no error occurs 
        let token_id = token.id;
        stripe.customers.create({ 
          email: stripe_email, 
          source: token_id, 
          name: stripe_username, 
          address: { 
              line1: 'TC 9/4 Old MES colony', 
              postal_code: stripe_zipcode, 
              city: 'Indore', 
              state: 'Madhya Pradesh', 
              country: 'India', 
          } 
      }) 
      .then((customer) => { 
        
        
          return stripe.charges.create({ 
              amount: total_amount * 100,     // Charing Rs 25 
              description: 'Web Development Product', 
              currency: 'INR', 
              customer: customer.id 
          }); 
      }) 
      .then((charge) => { 
          res.send({code:100,message: "$"+total_amount+" payment has been successfully completed."});  // If no error occurs 
      }) 
      .catch((err) => {
        res.send({code:200,message:err})
            // If some error occurs 
      });
    }) 
    .catch((err) => {
      res.send({code:200,message:err})      // If some error occurs 
    });


  });

  module.exports = router;