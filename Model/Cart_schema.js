const mongoose = require('mongoose');

const cartschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    quantity:{
        type:Number,
        required:true,
    }
}, { timestamps: true })
const cartdata = mongoose.model('Cart', cartschema);
module.exports = cartdata;