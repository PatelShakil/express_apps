const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    totalAmount:Number,
    date:{type:Date,default:Date.now()},
    products:[
        {
            productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
            quantity:Number
        }
    ]
})

module.exports = mongoose.model("Order",orderSchema);