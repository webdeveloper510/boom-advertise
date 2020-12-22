var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workersSchema = new Schema({
  id:  Boolean, // String is shorthand for {type: String}
  name: String,
  email:   String,
  password:   String,
  joindate:   Date
});
const workers = mongoose.model('workers', workersSchema);
module.exports = { workers,workersSchema } ;