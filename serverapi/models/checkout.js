var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const influencer_posts_schema = new Schema({
    id              :   String, // String is shorthand for {type: String}
    influencerid    :   { type: mongoose.Schema.ObjectId},
    amount          :   String,
    name            :   String,
    email           :   String,
    phone           :   String,
    description     :   String,
    response        :   String,
    created_at      :   Date,
    //created_at      :   { type: Date, default: Date.now }
});

const influencer_posts = mongoose.model('influencers_posts', influencer_posts_schema);
module.exports = {influencer_posts , influencer_posts_schema};