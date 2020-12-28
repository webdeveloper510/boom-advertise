var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const influencers_dataSchema = new Schema({
 // id:  Boolean, // String is shorthand for {type: String}
  influencer_id: String,
  tiktok_followers:   String,
  instagram_followers:   String,
  facebook_followers:   String,
  twitter_followers:   String
});
const  influencers_data = mongoose.model('influencers_data', influencers_dataSchema);
module.exports = { influencers_data,influencers_dataSchema } ;