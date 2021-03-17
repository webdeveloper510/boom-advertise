var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkout_schema = new Schema({
    id              :   String, // String is shorthand for {type: String}
    influencerid    :   { type: mongoose.Schema.ObjectId},
    name            :   String,
    email           :   String,
    phone           :   String,
    description     :   String,
    media_type      :   String,
    media_option    :   String,
    response        :   String,
    amount          :   String,
    status          :   Number,
    date            :   String,
    created_at      :   Date,
    //created_at      :   { type: Date, default: Date.now }
});

const checkout = mongoose.model('checkout_data', checkout_schema);
module.exports = {checkout , checkout_schema};