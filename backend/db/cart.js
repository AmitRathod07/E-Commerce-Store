const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    productId: Array(String)
});
const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;