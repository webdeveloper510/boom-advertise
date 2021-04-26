
var express         = require('express');
var router          = express.Router();
var   mongoose      = require('mongoose');
const promoters     = require('../models/promoters');
const influencers   = require('../models/influencers');
const checkout      = require('../models/checkout');
var   passwordHash  = require('password-hash');
const email         = require('../config/email');
const nodemailer    = require('nodemailer');
const path = require('path') 

// dimpy@codenomad.net account using for Stripe 
const account_id = 'acct_1HcUqfDnJHxQJk0M'; // get it from stripe's account profile info 
var Publishable_Key = 'pk_test_51HI9qMEXA7xfj1nHVxgdLB9TapBg5XlzSdvp991XoqXlLhePzY4I8l54WyzzRyDpMfWG8ubnIqUq7llRkahqiOsi00BDEFDLGg'
var Secret_Key = 'sk_test_STTTocdv5NxCwUDDwIBs5rZW00zadVbJnf';
const stripe = require('stripe')(Secret_Key);


  router.post("/account",async function(req , res){
    
    let card_number     = req.body.stripe_cardnumber;
    let card_cvc        = req.body.stripe_cvc;
    let month_year      = req.body.stripe_month_year.split('/');
    let exp_month       = month_year[0];
    let exp_year        = month_year[1] ? month_year[1]: '';

    const token = await stripe.tokens.create({
      card: {
        number: card_number,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: card_cvc,
      },
      
      currency: 'usd',
      
  })
  .then((token) => {
    console.log(token.id);

    var bankAccount =  stripe.accounts.createExternalAccount(
      account_id,
      {
        //external_account:"tok_1IkVLfCe7ZPGJJ1Pu1VPe2BI",
        external_account:token.id,
      },
    ).then((details) => {
      console.log(details)
      res.send({code:100,message:details})  
    }).catch((err)=>{

      res.send({code:200,message:err})      // If some error occurs 
    });

    console.log(bankAccount);
  }) 
  .catch((err) => {
    res.send({code:200,message:err})      // If some error occurs 
  });
  });
  module.exports = router;