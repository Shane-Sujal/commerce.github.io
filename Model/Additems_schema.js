const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity:{
        type:Number,
        requried:true,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
itemSchema.index({category:'text'});
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
