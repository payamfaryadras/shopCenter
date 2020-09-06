const Product = require('./product')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Shop = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        lowercase: true
    },
    url: {
        type: String,
        required: [false, ''],
        lowercase: true
    },
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model("Shop", Shop);
