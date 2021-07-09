
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

// const account_id = 'acct_1HI9qMEXA7xfj1nH'; // get it from stripe's account profile info 
// var Publishable_Key = 'pk_test_51HI9qMEXA7xfj1nHVxgdLB9TapBg5XlzSdvp991XoqXlLhePzY4I8l54WyzzRyDpMfWG8ubnIqUq7llRkahqiOsi00BDEFDLGg'
// var Secret_Key = 'sk_test_51HI9qMEXA7xfj1nHePxD4KlYqi9nUUlpjvpDmwNQhMEyQCeTMCiUGw6AFWuJ4YytCyVgr9Br1BkqohBvFJGG3skO00THMGx9Fv';
// const stripe = require('stripe')(Secret_Key);


  router.post("/account",async function(req , res){
    
    let card_number     = req.body.stripe_cardnumber;
    let card_cvc        = req.body.stripe_cvc;
    let month_year      = req.body.stripe_month_year.split('/');
    let exp_month       = month_year[0];
    let exp_year        = month_year[1] ? month_year[1]: '';

    let bank_account_id = 'acct_1IlAXp2Ro4VhpXru';
    let account_status =false;
    const account = await stripe.accounts.retrieve(
      bank_account_id
    );

    account_status = account.capabilities.transfers == 'active' ? true : false;

    
    return;

    const token = await stripe.tokens.create({
      card: {
        number: card_number,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: card_cvc,
        currency: 'USD',
      },
      
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
      res.send({code:100,message:JSON.stringify(details)})  
    }).catch((err)=>{

      res.send({code:200,message:err})      // If some error occurs 
    });

    console.log(bankAccount);
  }) 
  .catch((err) => {
    res.send({code:200,message:err})      // If some error occurs 
  });
  });

  router.post("/craete-account",async function(req , res){

    var email = req.body.email;
    const account = await stripe.accounts.create({
      type: 'custom',
      country: 'US',
      email: email,
      capabilities: {
        card_payments: {requested: true},
        transfers: {requested: true},
      },
    });

    console.log("viay");
    console.log(account);
    res.send({code:100,message:account})
  });
  module.exports = router;