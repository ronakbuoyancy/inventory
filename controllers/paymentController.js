const Payment = require("../models/paymentSchema");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Customer = require("../models/customerSchema");

exports.createPayment = catchAsyncError(async (req, res, next) => {
  //console.log("data", req.body);
  const payment = await Payment.create(req.body);
  const customer = await Customer.findById(req.body.customer_id)
  const balance = customer.balance + req.body.amount
  const data = await Customer.findByIdAndUpdate(req.body.customer_id, {balance:balance}, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  console.log(data)
  res.status(201).json({
    success: true,
    payment,
  });
});

exports.getPaymentsByCustomer = catchAsyncError(async (req, res) => {
  const customer_id = req.params.customer_id;
  const payments = await Payment.find({customer_id})
  res.status(200).json({ success: true, payments });
});

exports.getPaymentDetails = catchAsyncError(async (req, res, next) => {
  let payment = await Payment.findById(req.params.id);

  if (!payment) {
    return next(new ErrorHandler("Payment not Found", 404));
  }
  return res.status(200).json({
    success: true,
    payment,
  });
});

exports.updatePayment = catchAsyncError(async (req, res, next) => {
  let payment = await Payment.findById(req.params.id);

  if (!payment) {
    return next(new ErrorHandler("Payment not Found", 404));
  }
  payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    payment,
  });
});

exports.deletePayment = catchAsyncError(async (req, res, next) => {
  let payment = await Payment.findById(req.params.id);

  if (!payment) {
    return next(new ErrorHandler("payment not Found", 404));
  }
  await payment.remove();
  res.status(200).json({
    success: true,
    message: "payment deleted successfully",
  });
});
