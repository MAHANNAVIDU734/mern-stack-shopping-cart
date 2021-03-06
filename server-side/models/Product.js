const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productname: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    image: { type: String, required: true }
});


module.exports = mongoose.model("Product", productSchema);

