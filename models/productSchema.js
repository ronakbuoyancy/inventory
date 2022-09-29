const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  hsn_code:{
    type: Number,
    required: [true, "Please Enter hsn code"],
    maxLength: [6, "Not exceed more then 6"],
  },
  purchase_price: {
    type: Number,
    required: [true, "Please Enter purchase price"],
    maxLength:8
  },
  cost_price: {
    type: Number,
    required: [true, "Please Enter cost price"],
    maxLength:8
  },
  sgst: {
    type: Number,
    required: [true, "Please Enter SGST value"],
  },
  cgst: {
    type: Number,
    required: [true, "Please Enter CGST value"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    maxLength: [8, "Not exceed more then 8"],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
