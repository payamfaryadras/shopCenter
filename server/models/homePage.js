const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomePage = new Schema({
    businessDetails: {
        type: String,
        required: [true, 'businessDetails is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    address: {
        type: String,
        required: [true, 'address is required'],
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    shop: {type: mongoose.Schema.Types.ObjectId, ref: "Shop"}
})
module.exports = mongoose.model("HomePage", HomePage);