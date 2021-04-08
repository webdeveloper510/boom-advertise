var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const influencer_posts_schema = new Schema({
    id              :   String, // String is shorthand for {type: String}
    influencerid    :   { type: mongoose.Schema.ObjectId},
    //media_type      :   String,
    post_name       :   String,
    //post_type       :   String,
    price           :   String,
    description     :   String,
    upload_type     :   String,
});

const influencer_posts = mongoose.model('influencers_posts', influencer_posts_schema);
module.exports = {influencer_posts , influencer_posts_schema};