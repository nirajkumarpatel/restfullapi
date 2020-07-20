const mongoose =require('mongoose');
const ProductSchema = mongoose.Schema({

_id: mongoose.Schema.Types.ObjectId,
name: { type: String, required: true },
price: { type: Number, required: true }

// name: String,
// price: Number
});

module.exports= mongoose.model('Product', ProductSchema);
