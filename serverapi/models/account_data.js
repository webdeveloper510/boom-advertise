var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const account_schema = new Schema({
    id                  :   String, // String is shorthand for {type: String}
    influencerid        :   { type: mongoose.Schema.ObjectId},
    bank_account_id     :   String,
    card_id             :   String,
    last_4              :   String,
    card_added_response :   String,
    created_at          :   Date,
    //created_at      :   { type: Date, default: Date.now }
});

const account_data = mongoose.model('account_data', account_schema);
module.exports = {account_data , account_schema};