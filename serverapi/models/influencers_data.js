var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const influencers_dataSchema = new Schema({
  id:  String, // String is shorthand for {type: String}
  influencerid: { type: mongoose.Schema.ObjectId},
  influencermatchid: String,
  tiktokfollowers:   String,
  instagramfollowers:   String,
  facebookfollowers:   String,
  twitterfollowers:   String,
  tiktok_post_price : String,
  tiktok_story_price : String,
  facebook_post_price : String,
  facebook_friend_price : String,
  facebook_comment_price : String,
  facebook_like_price : String,
  twitter_tweet_price : String,
  twitter_retweet_price : String,
  twitter_comment_price : String,
  twitter_like_price : String,
  twitter_follow_price : String,
  instagram_post_price : String,
  instagram_story_price : String,
  instagram_comment_price : String,
  instagram_like_price : String,
  instagram_follow_price : String,
});
const  influencers_data = mongoose.model('influencers_data', influencers_dataSchema);
module.exports = { influencers_data,influencers_dataSchema } ;