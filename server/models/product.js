const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Product = new Schema({
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
    count: {
        type: Number,
        required: [true, 'count is required'],
        lowercase: true
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        lowercase: true
    }
});
module.exports = mongoose.model('Product', Product);





