const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'brands' },
    productId: Array(String)
});
const Brands = mongoose.model("brands", brandSchema);
module.exports = Brands;