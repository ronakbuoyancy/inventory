const Customer = require("../models/customerSchema");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures")

exports.createCustomer = catchAsyncError(async (req, res, next) => {
  console.log("data", req.body);
  const customer = await Customer.create(req.body);
  res.status(201).json({
    success: true,
    customer,
  });
});

exports.getAllCustomer = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const customerCount = await Customer.countDocuments();
  const Apifeature = new ApiFeatures(Customer.find(), req.query)
    .searchCustomer()
    .pagination(resultPerPage);
  const customers = await Apifeature.query;
  res.status(200).json({ success: true, customers, no_of_customers:customerCount });
});

exports.getCustomerDetails = catchAsyncError(async (req, res, next) => {
  let customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorHandler("Customer not Found", 404));
  }
  return res.status(200).json({
    success: true,
    customer,
  });
});

exports.updateCustomer = catchAsyncError(async (req, res, next) => {
  let customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorHandler("Customer not Found", 404));
  }
  customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    customer,
  });
});

exports.deleteCustomer = catchAsyncError(async (req, res, next) => {
  let customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorHandler("customer not Found", 404));
  }
  await customer.remove();
  res.status(200).json({
    success: true,
    message: "customer deleted successfully",
  });
});
