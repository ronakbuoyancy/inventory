const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({

  invoice_no:{
    type:Number,
    required: [true, "Please Enter Invoice Number"],
  },
  date_of_invoice: {
    type: Date,
    required: [true, "Please Enter Date of Invoice"],
  },
  dealer_name: {
    type: String
  },
  products: [
    {
      product_id:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true
      },
      product_name: {
        type: String,
        required: [true, "Please Enter product Name"],
      },
      hsn_code:{
        type: Number,
        required: [true, "Please Enter hsn code"],
        maxLength: [6, "Not exceed more then 6"],
      },
      quantity:{
        type: Number,
        required: [true, "Please Enter Quantity"],
        maxLength:4
      },
      perchase_price: {
        type: Number,
        required: [true, "Please Enter cost price"],
        maxLength:8
      },
      discount_percentage:{
        type: Number,
        required: [true, "Please Enter discount Percentage"],
        maxLength:4
      },
      discount_amount:{
        type: Number,
        required: [true, "Please Enter discount Amount"],
        maxLength:8
      },
      taxable_amount:{
        type: Number,
        required: [true, "Please Enter discount Amount"],
        maxLength:8
      },
      sgst_percentage: {
        type: Number,
        required: [true, "Please Enter SGST Percentage"],
        maxLength:4
      },
      sgst_amount: {
        type: Number,
        required: [true, "Please Enter SGST value"],
        maxLength:8
      },
      cgst_percentage: {
        type: Number,
        required: [true, "Please Enter CGST Percentage"],
        maxLength:4
      },
      cgst_amount: {
        type: Number,
        required: [true, "Please Enter CGST value"],
        maxLength:8
      },

    },
  ],
  gross: {
    type: Number,
    required: [true, "Please Enter Gross Amount"],
    maxLength:8
  },
  discount: {
    type: Number,
    required: [true, "Please Enter Gross Amount"],
    maxLength:8
  },
  sgst: {
    type: Number,
    required: [true, "Please Enter SGST value"],
    maxLength:8
  },
 cgst: {
    type: Number,
    required: [true, "Please Enter CGST value"],
    maxLength:8
  },
  Total:{
    type: Number,
    required: [true, "Please Enter Total value"],
    maxLength:8
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Purchase = mongoose.model("purchase", purchaseSchema);

module.exports = Purchase;
