
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const influencer = require('../models/influencers');
const influencers_data = require('../models/influencers_data');
const influencer_posts = require('../models/influencers_posts');
//const email = require('../config/email');
//const nodemailer = require('nodemailer');
var passwordHash = require('password-hash');
const {ObjectId} = require('mongodb'); 
const multer = require('multer');
var fileExtension = require('file-extension')
var fs = require('fs');
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

var storage = multer.diskStorage({

  // Setting directory on disk to save uploaded files
  destination: function (req, file, cb) {
      cb(null, 'uploads')
  },
 

  // Setting name of file saved
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
  }
})

var upload = multer({
  storage: storage,
  limits: {
      // Setting Image Size Limit to 2MBs
      fileSize: 200000000
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          //Error 
          cb(new Error('Please upload JPG and PNG images only!'))
      }
      //Success 
      cb(undefined, true)
  }
})

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

      influencerData.twitterfollowers = req.body.influencer_signup.twitter_followers
      influencerData.tiktokfollowers = req.body.influencer_signup.tiktok_followers
      influencerData.facebookfollowers = req.body.influencer_signup.fb_followers
      influencerData.instagramfollowers = req.body.influencer_signup.insta_followers
      
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
                  influencerData.influencerid = influencer_res['_id']
                  influencerData.influencermatchid = influencer_res['_id']
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
      res.json("it worked vijay");
    });

    router.get('/getInfluencers', function(req, res, next) {
        influencers_data.influencers_data.aggregate([
            { "$lookup": {
                    "from": "influencers",
                    "localField": "influencerid",
                    "foreignField": "_id",
                    "as": "vals"
                  }
            }

            ], function(err, res_data) {
              if (err)  res.json({status:"failure",statusCode:100,error:err});
                res.json({status:"success",statusCode:200,data:res_data});
            })

    });

    /**** Trying to get all influencers data as first table influencers ***/
      router.get('/getInfluencers1', function(req, res, next) {
            influencer.influencers.aggregate([
              { "$lookup": {
                      "from": "influencers_data",
                      "localField": "_id",
                      "foreignField": "influencerid",
                      "as": "vals"
                    }
              }
              ], function(err, res_data) {
                  if (err)  res.json({status:"failure",statusCode:100,error:err});
                    res.json({status:"success",statusCode:200,data:res_data});
                  })
      });

     router.get('/singleInfluencer', function(req, res) {

      var  user_id = req.query.user_id;
      
        influencers_data.influencers_data.aggregate(
            [
              {
                "$lookup":{

                  "from": "influencers",
                  "localField": "influencerid",
                  "foreignField": "_id",
                  "as": "vals"
              }}
              ,
              {
                "$match":{
                  "influencermatchid" : user_id
                }
              }
          ]
            ,function(err,influencer_data){
            if(err) res.json({status:"failure",statusCode:100,error:err});

            
            
            var return_data = {
                                price_data:{
                                  tiktok      : { post_price : 0, story_price : 0},
                                  instagram   : { post_price : 0, story_price : 0},
                                  facebook    : { post_price : 0, story_price : 0},
                                  twitter     : { post_price : 0, story_price : 0},
                                },
                                profile_data  :"",
                                followers   : 0,
                                posts         :{
                                                tiktok    :  [],
                                                instagram :  [],
                                                facebook  :  [],
                                                twitter   :  [],
                                },
                              };
            
            

            if(influencer_data[0]){
              
              return_data.price_data.tiktok.post_price  = influencer_data[0].tiktok_post_price ? influencer_data[0].tiktok_post_price : 0;
              return_data.price_data.tiktok.story_price = influencer_data[0].tiktok_story_price ? influencer_data[0].tiktok_story_price: 0;

              return_data.price_data.facebook.post_price = influencer_data[0].facebook_post_price ? influencer_data[0].facebook_post_price: 0;
              return_data.price_data.facebook.story_price = influencer_data[0].facebook_story_price ? influencer_data[0].facebook_story_price: 0;
              
              return_data.price_data.instagram.post_price = influencer_data[0].instagram_post_price ? influencer_data[0].instagram_post_price: 0;
              return_data.price_data.instagram.story_price = influencer_data[0].instagram_story_price ? influencer_data[0].instagram_story_price: 0;
              
              return_data.price_data.twitter.post_price = influencer_data[0].twitter_post_price ? influencer_data[0].twitter_post_price: 0;
              return_data.price_data.twitter.story_price = influencer_data[0].twitter_story_price ? influencer_data[0].twitter_story_price: 0;
              
              return_data.followers     = influencer_data[0] ? influencer_data[0] : 0;
              return_data.profile_data  = influencer_data[0].vals ? influencer_data[0].vals[0] : "";
              
            }

            influencer.influencers.findOne({_id : user_id},function(err , profile_data){

              if (err)  res.json({status:"failure",statusCode:100,msg:err});
              
              if(profile_data){
                
                
                profile_data.profile_picture =  profile_data.profile_picture ? "http://"+req.headers.host+"/"+profile_data.profile_picture : "/assets/images/man-avatar-profile.jpg";
                
              } 
              
              return_data.profile_data = profile_data;
              
              influencer_posts.influencer_posts.find({influencerid:user_id}, function(post_error, posts) {
                if (post_error)  res.json({status:"failure",statusCode:100,msg:post_error});
                
                if(posts){
                  
                  for(var i = 0 ; i < posts.length;i++){

                    var post_value = { 
                                        id : posts[i]._id ,
                                        influencer_id : posts[i].influencerid ,
                                        image : "http://"+req.headers.host+"/"+posts[i].post_name,
                                        text_name:"@lorengray "+posts[i].media_type+i,
                                        description:posts[i].media_type+" human machine recognition page",
                                        likes_count:"50.8K",
                                        comments_count:"20.8K"
                                      };
    
                    return_data.posts[posts[i].media_type].push(post_value); 
                  }
                  res.json({status:"success",statusCode:200,data:influencer_data,mydata:return_data});
                } else {
                  res.json({status:"success",statusCode:200,data:influencer_data,mydata:return_data});
                }
  
              })

            });

            

            
             
            
          });
      });

      router.post('/update_price', function(req , res){

        var user_data = req.body;

        if(user_data.media_type == "tiktok"){
          var update_data = {
                              tiktok_post_price : user_data.post_price,
                              tiktok_story_price : user_data.story_price,
                              
                            }
        }else if(user_data.media_type == "facebook"){

          var update_data = {
                              facebook_post_price : user_data.post_price,
                              facebook_story_price : user_data.story_price,
                            }

        }else if(user_data.media_type == "instagram"){

          var update_data = {
                              instagram_post_price : user_data.post_price,
                              instagram_story_price : user_data.story_price,
                            }

        }else if(user_data.media_type == "twitter"){

          var update_data = {
                              twitter_post_price : user_data.post_price,
                              twitter_story_price : user_data.story_price,
                            }

        }

        influencers_data.influencers_data.updateOne({influencerid : new ObjectId(user_data.user_id)} , {$set:update_data},function(err , data){

          if(err){
            res.json({status:"failure",statusCode:100,data:err});
          }else{

            res.json({status:"success",statusCode:200,data:data});
          }
        })


        
      });

      router.post('/update_profile',function(req , res){

        let user_data = req.body;
        var update_data = {
                              name:user_data.name,
                              //email:user_data.email,
                          };
        
        influencer.influencers.updateOne({_id : user_data.user_id} , {$set:update_data},function(err , data){

          if(err){
            res.json({status:"failure",statusCode:100,data:err});
          }else{

            res.json({status:"success",statusCode:200,data:data});
          }
        });
      });


      router.post('/upload_post', upload.single('uploadedImage'), (req, res, next) => {
        const file = req.file
        var user_data = req.body;
        
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }

        var post_create = new influencer_posts.influencer_posts();
        
        post_create.post_name     = file.filename;
        post_create.influencerid  = user_data.user_id;
        post_create.media_type    = user_data.media_type;
        post_create.post_type     = user_data.post_type;
        
        post_create.save(function(err ,data){

          if (err)  res.json({status:"failure",statusCode:100,msg:err});
          res.status(200).send({ statusCode: 200, status: 'success', data: file, })
        });
      
      }, (error, req, res, next) => {
        res.status(400).send({ error: error.message })
      });

      router.get("/delete_post",function(req , res){

        var  post_id = req.query.post_id;

        influencer_posts.influencer_posts.deleteOne({_id:post_id},function(error , data){
          if(error) res.json({status:"failure",statusCode:100,data:error});
          res.json({statusCode: 200, status: 'success', data: data});
        })
      });


      router.post('/upload_profile_image', upload.single('profileImage'), (req, res, next) => {
        const file = req.file
        var user_data = req.body;
        
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }

        let update_data = { profile_picture : file.filename };

        influencer.influencers.updateOne({_id : user_data.user_id},{$set:update_data},function(err , update_dta){

          if(err){
            res.json({status:"failure",statusCode:100,data:err});
          }else{

            res.json({status:"success",statusCode:200,data:update_dta});
          }
        });
        
      
      }, (error, req, res, next) => {
        res.status(400).send({ error: error.message })
      });

  
    module.exports = router;