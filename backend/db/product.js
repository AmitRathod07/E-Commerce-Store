const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name: String,
    shortDescription: String,
    description: String,
    Price: Number,
    discount: Number,
    images: Array(String),
    categoryId: [{ type: Schema.Types.ObjectId, ref: 'categories' }],
    barandId: [{ type: Schema.Types.ObjectId, ref: 'categories' }]
});
const Product = mongoose.model("products", productSchema);
module.exports = Product;
