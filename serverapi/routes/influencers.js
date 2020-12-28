
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const influencer = require('../models/influencers');
const influencers_data = require('../models/influencers_data');
//const email = require('../config/email');
//const nodemailer = require('nodemailer');
var passwordHash = require('password-hash');

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

router.post('/register', async function(req,res) {
console.log(req.body.influencer_signup);
      var influencerCreate =  new influencer.influencers(req.body.influencer_signup);
      var influencerData =  new influencers_data.influencers_data(req.body.influencer_signup);

      var datetime = new Date();
      let pass = passwordHash.generate(req.body.influencer_signup.password)

      influencerCreate.joindate = datetime
      influencerCreate.password = pass
      influencerCreate.tiktok = req.body.influencer_signup.tiktok
      influencerCreate.instagram = req.body.influencer_signup.insta
      influencerCreate.facebook = req.body.influencer_signup.fb
      influencerCreate.twitter = req.body.influencer_signup.twitter

      influencerData.twitter_followers = req.body.influencer_signup.twitter_followers
      influencerData.tiktok_followers = req.body.influencer_signup.tiktok_followers
      influencerData.facebook_followers = req.body.influencer_signup.fb_followers
      influencerData.instagram_followers = req.body.influencer_signup.insta_followers
      
      influencer.influencers.findOne({email:req.body.influencer_signup.email}, function(err, influencers) {
        if (err)  res.json({status:"failure",statusCode:100,msg:err});
        
        if(influencers){
          console.log(influencers)
          res.json({status:"failure",statusCode:100,msg:"Email already exists!!"});
        }else{
            influencer.influencers.findOne({name:req.body.influencer_signup.name}, function(err, influencers) {
            if (err)  res.json({status:"failure",statusCode:100,msg:err});
        
            if(influencers){
              console.log(influencers)
              res.json({status:"failure",statusCode:100,msg:"Username already exists!!"});
            }
            else{
              
                influencerCreate.save(function (err, influencer_res) {
                  influencerData.influencer_id = influencer_res['_id']
                  influencerData.save(function (err1, influ_data_res) {
                    if (err || err1) res.json({status:"failure",statusCode:100,msg:err});
                    res.json({status:"success",statusCode:200,data:influencer_res,msg:"Signup & SignIn successfully!"});
                  });
                });
            }
          })
        }
      }); 
      
    });

    router.get('/test', function(req,res) {
      res.json("it workedvijay");
    });
    module.exports = router;