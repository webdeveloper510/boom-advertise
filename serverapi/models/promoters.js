var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotersSchema = new Schema({
  id:  Boolean, // String is shorthand for {type: String}
  name: String,
  email:   String,
  password:   String,
  joindate:   Date
});
const  promoters = mongoose.model('promoters', promotersSchema);
module.exports = { promoters,promotersSchema } ;