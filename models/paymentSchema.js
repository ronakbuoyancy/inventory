const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  shop_name: {
    type: String,
    required: [true, "Please Enter Shop Name"],
  },
  customer_id:{
    type: String,
    required: [true, "Please Enter Customer Id"],
  },
  date_of_payment: {
    type: Date,
    required: [true, "Please Enter Date of payment"],
  },
  amount: {
    type: Number,
    required: [true, "Please Enter Amount"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("payment", paymentSchema);
