var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const influencersSchema = new Schema({
  id              :   String, // String is shorthand for {type: String}
  name            :   String,
  email           :   String,
  password        :   String,
  profile_picture :   String,
  tiktok          :   Boolean,
  instagram       :   Boolean,
  facebook        :   Boolean,
  twitter         :   Boolean,
  joindate        :   Date,
}
);
const  influencers = mongoose.model('influencers', influencersSchema);
module.exports = { influencers,influencersSchema } ;