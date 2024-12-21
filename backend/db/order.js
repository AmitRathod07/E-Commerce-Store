const mongoose = require("mongoose");
const orderschema = new mongoose.Schema({
    date: Date,
    items: Array(any),
    status: Number
});
const Order = mongoose.model("orders", orderschema);
module.exports = Order;