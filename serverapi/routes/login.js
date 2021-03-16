
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

    
    let email             = req.body.email;
    let name              = req.body.name;
    let password          = req.body.password;
    let phone             = req.body.phone;
    let description       = req.body.description;
    let total_amount      = req.body.total_amount;
    let user_description  = req.body.user_description;
    let influencer_email  = req.body.influencer_email.trim();

    let stripe_email    = req.body.stripe_email;
    let stripe_username = req.body.stripe_username;
    let card_number     = req.body.stripe_cardnumber;
    let card_cvc        = req.body.stripe_cvc;
    let stripe_zipcode  = req.body.stripe_zipcode;
    let month_year      = req.body.stripe_month_year.split('/');

    let exp_month       = month_year[0];
    let exp_year        = month_year[1] ? month_year[1]: '';

    let date_ob = new Date();


    let date = ("0" + date_ob.getDate()).slice(-2);


    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    let year = date_ob.getFullYear();


    let hours = date_ob.getHours();


    let minutes = date_ob.getMinutes();


    let seconds = date_ob.getSeconds();
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    let dateTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    
    if(!influencer_email){
      res.send({code:201,message: " Influencer doesn't have any email"});
      return;
    }

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
        
        
        

        let subject = 'Buy by user from Boomadvertisement';
        
        sendEmail(influencer_email , subject,user_description);
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