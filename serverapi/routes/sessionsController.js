const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const oauth = require('oauth');
const _twitterConsumerKey = process.env.TWITTER_CONSUMER_KEY;
const _twitterConsumerSecret = process.env.TWITTER_CONSUMER_SECRET;
const twitterCallbackUrl = process.env.TWITTER_CALLBACK_URL;
const consumer = new oauth.OAuth("https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",_twitterConsumerKey, _twitterConsumerSecret, "1.0A", twitterCallbackUrl, "HMAC-SHA1");

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
     // logger.error(error);
      res.send(error, 500);
    }
    else {
      req.session.oauthAccessToken = oauthAccessToken;
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret
      return res.send({ message: 'token saved' });
    }
  });
});
module.exports = router;