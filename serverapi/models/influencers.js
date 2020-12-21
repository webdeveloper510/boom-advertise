var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const influencersSchema = new Schema({
  id:  Boolean, // String is shorthand for {type: String}
  name: String,
  email:   String,
  password:   String,
  joindate:   Date
});
const  influencers = mongoose.model('influencers', influencersSchema);
module.exports = { influencers,influencersSchema } ;