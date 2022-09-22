const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  shop_name: {
    type: String,
    required: [true, "Please Enter Shop Name"],
  },
  customer_name: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    required: [true, "Please Enter Address"],
  },
  contact_no: {
    type: Number,
    maxLength: 10,
  },
  gst_no: {
    type: String,
    length:[15, "Enter valid GST number"]
  },
  balance: {
    type: Number,
    required: [true, "Please Enter Balance of Customer"],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("customer", customerSchema);
