const mongoose = require('mongoose');
const Shop = require('./shop')
const Schema = mongoose.Schema;

const Comment = new Schema({
    description: {
        type: String,
        required: [true, 'description is required'],
        lowercase: true
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    shop: {type: mongoose.Schema.Types.ObjectId, ref: "Shop"}
})
module.exports = mongoose.model("Comment", Comment);