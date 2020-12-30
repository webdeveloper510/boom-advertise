var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const influencers_dataSchema = new Schema({
  id:  String, // String is shorthand for {type: String}
  influencerid: { type: mongoose.Schema.ObjectId},
  tiktokfollowers:   String,
  instagramfollowers:   String,
  facebookfollowers:   String,
  twitterfollowers:   String
});
const  influencers_data = mongoose.model('influencers_data', influencers_dataSchema);
module.exports = { influencers_data,influencers_dataSchema } ;