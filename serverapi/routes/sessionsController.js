const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const oauth = require('oauth');
const _twitterConsumerKey = process.env.TWITTER_CONSUMER_KEY;
const _twitterConsumerSecret = process.env.TWITTER_CONSUMER_SECRET;
const twitterCallbackUrl = process.env.TWITTER_CALLBACK_URL;
const consumer = new oauth.OAuth("https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",_twitterConsumerKey, _twitterConsumerSecret, "1.0A", twitterCallbackUrl, "HMAC-SHA1");
const influencers_data = require('../models/influencers_data');
const Twitter = require('twit');
var ObjectID = require('mongodb').ObjectID;


//var url = require('url');
//var url_parts = url.parse(request.url, true);
//var query = url_parts.query;

router.get('/connect', (req, res) => {
  consumer.getOAuthRequestToken(function (error, oauthToken,   oauthTokenSecret, results) {
    if (error) {
      res.send(error, 500);
    } else {
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      const redirect = { 
redirectUrl: `https://twitter.com/oauth/authorize?oauth_token=${req.session.oauthRequestToken}`
    }
      res.send(redirect);
    }
  });
});
router.post('/saveAccessTokens', (req, res) => {
  consumer.getOAuthAccessToken(
  req.body.oauth_token,
  req.session.oauthRequestTokenSecret,
  req.body.oauth_verifier,
  (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
    if (error) {
     
      res.send(error, 500);
    }
    else {
     

      const client = new Twitter({
        consumer_key: 'PwtlyF8xzKLgIPNDwS42nL87G',
        consumer_secret: 'hg9QMATkfZp0ZW3K5TXRFvwfsMCe5JChzlbf2Tb3JjL7rJCWUc',
        access_token: oauthAccessToken,
        access_token_secret: oauthAccessTokenSecret
      });

      client.get('account/verify_credentials').then(user => {
     
            console.log('mehar');
            live_twitter_follower = user.data.followers_count;

            influencers_data.influencers_data.updateOne(
              { "influencerid": new ObjectID(req.body._id) },
              {
                $set: { "twitterfollowers" : live_twitter_follower },
              },
              function(err,result){ 
                if (err) {
                  console.log(err);
                  res.json({status:"failure",statusCode:100,error:'could not save data'});
                }
                else{
                  console.log(result);
                res.json({status:"success",statusCode:200,data:result});
                }
              });
               

      }).catch(error => {
        res.send(error);
      });



    }
  });
});
module.exports = router;